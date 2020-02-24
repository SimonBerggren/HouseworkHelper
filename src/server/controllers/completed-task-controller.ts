import express from 'express';

import CompletedTaskModel from '../model/completed-task-model';

import { findUser, findTask, getHouseholdID } from '../utils/mongo-utils';
import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';

const router = express.Router();

// get 20 latest completed tasks in household
router.get('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);

    const completedTasks = await CompletedTaskModel.find({ householdID }, null).sort({ 'date': -1 }).limit(20);
    return res.json(completedTasks);
});

// complete task
router.post('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { taskName, userName } = req.body as CompleteTaskRequest;

    try {
        const taskToComplete = await findTask({ householdID, taskName });
        const user = await findUser({ householdID, userName });

        const completedTask: CompletedTask = {
            householdID,
            taskID: taskToComplete.id,
            userID: user.id,
            date: Date.now()
        };

        const createdCompletedTask = await CompletedTaskModel.create(completedTask);

        if (createdCompletedTask) {

            user.points += taskToComplete.points;
            user.save();

            return res.json(true);
        }

        return res.json(false);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
import express from 'express';

import CompletedTaskModel from '../model/completed-task-model';

import { findUser, findTask, getHousehold } from '../utils/mongo-utils';
import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';

const router = express.Router();

// get all completed tasks in household
router.get('/', authenticate(), async (req, res) => {

    const { email } = req.user as Household;

    const completedTasks = await CompletedTaskModel.find({ email });
    return res.json(completedTasks);
});

// complete task
router.post('/', authenticate(), async (req, res) => {

    const householdID = getHousehold(req).id;
    const { taskTitle, userName } = req.body as CompleteTaskRequest;

    try {
        const user = await findUser({ householdID, name: userName });

        const userID = user.id;

        const taskToComplete = await findTask({ householdID, title: taskTitle });

        const taskID = taskToComplete.id;

        const completedTask: CompletedTask = {
            householdID,
            taskID,
            userID,
            date: Date.now()
        };

        const createdCompletedTask = await CompletedTaskModel.create(completedTask);

        user.points += taskToComplete.points;
        user.save();

        return res.json(createdCompletedTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
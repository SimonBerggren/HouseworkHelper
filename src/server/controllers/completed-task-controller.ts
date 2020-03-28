import express from 'express';

import CompletedTaskModel from '../model/completed-task-model';

import { authenticate } from '../authentication/authentication';
import { getHouseholdID, getUser } from '../utils/mongo-utils';
import { findTask } from '../model/task-model';
import { badRequest } from '../error';

const router = express.Router();

// get 20 latest completed tasks in household
router.get('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);

        const completedTasks = await CompletedTaskModel.find({ householdID }, undefined).sort({ 'date': -1 }).limit(20);

        return res.json(completedTasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

// complete task
router.post('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const user = getUser(req);
        const { taskName } = req.body as CompleteTaskRequest;

        const taskToComplete = await findTask(householdID, taskName);

        const completedTask: CompletedTask = {
            householdID,
            taskID: taskToComplete.id,
            userID: user.id,
            date: Date.now()
        };

        const createdCompletedTask = await CompletedTaskModel.create(completedTask);

        if (!createdCompletedTask) {
            throw 'Unable to complete task';
        }

        user.points += taskToComplete.points;
        user.save();

        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
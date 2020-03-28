import express from 'express';

import { findLatestCompletedTasks, createCompletedTask } from '../model/completed-task-model';
import { authenticate, getHouseholdID, getUser } from '../authentication/authentication';
import { findTask } from '../model/task-model';
import { badRequest } from '../error';

const router = express.Router();

// get 20 latest completed tasks in household
router.get('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const uglyHardCodedLimit = 20;

        const completedTasks = await findLatestCompletedTasks(uglyHardCodedLimit, householdID);

        return res.json(completedTasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

// complete task
router.post('/', authenticate(), async (req, res) => {
    try {
        const { taskName } = req.body as CompleteTaskRequest;
        const householdID = getHouseholdID(req);
        const user = getUser(req);

        const taskToComplete = await findTask(householdID, taskName);

        await createCompletedTask(householdID, user.id, taskToComplete.id);

        user.points += taskToComplete.points;
        user.save();

        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
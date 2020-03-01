import express from 'express';

import TaskModel from '../model/task-model';

import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';
import { getHouseholdID } from '../utils/mongo-utils';

const router = express.Router();

// get tasks from a household
router.get('/:user', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);

    try {
        const tasks = await TaskModel.find({ householdID });

        const filteredTasks = tasks.filter(task => task.visibleToAll || (task.visibleTo.findIndex(u => u === req.params.user) >= 0));

        return res.json(filteredTasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

// create new task
router.post('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const taskToCreate = req.body as Task;

    try {
        const createdTask = await TaskModel.create({ householdID, ...taskToCreate });
        return res.json(createdTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

// update task

// delete task
router.delete('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { taskName } = req.body as Task;

    try {
        const deletedTask = await TaskModel.findOneAndDelete({ householdID, taskName });
        return res.json(deletedTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
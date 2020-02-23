import express from 'express';

import TaskModel from '../model/task-model';

import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';
import { getHousehold } from '../utils/mongo-utils';

const router = express.Router();

// get tasks from a household
router.get('/', authenticate(), async (req, res) => {

    const householdID = getHousehold(req).id;

    try {
        const tasks = await TaskModel.find({ householdID });
        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

// create new task
router.post('/', authenticate(), async (req, res) => {

    const householdID = getHousehold(req).id;

    const { title, desc, points, frequency } = req.body as Task;

    try {
        const createdTask = await TaskModel.create({ householdID, title, desc, points, frequency });
        return res.json(createdTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

router.delete('/', authenticate(), async (req, res) => {

    const householdID = getHousehold(req).id;

    const { title } = req.body as Task;

    try {
        const deletedTask = await TaskModel.findOneAndDelete({ householdID, title });
        return res.json(deletedTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

// get tasks from a household
// not protected so should only be active during development
router.get('/:email', async (req, res) => {

    const email = req.params.email;

    try {
        const tasks = await TaskModel.find({ email });
        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
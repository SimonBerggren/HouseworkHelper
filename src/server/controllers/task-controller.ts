import express from 'express';

import TaskModel from '../model/task-model';

import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';
import { getHouseholdID, findUser, findTasks, findHousehold } from '../utils/mongo-utils';

const router = express.Router();

// get tasks from a household
router.get('/:user', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);

    try {
        const user = await findUser({ householdID, userName: req.params.user });

        const tasks = await findTasks({ householdID });


        const filteredTasks = tasks.filter(task => task.visibleToAll || (task.visibleTo.findIndex(u => u === user.id) >= 0));

        const mappedTasks = await Promise.all(filteredTasks.map(async task => {
            task.visibleTo = await Promise.all(task.visibleTo.map(async userID => {
                const user = await findUser({ _id: userID });
                return user.userName;
            }));
            return task;
        }));

        return res.json(mappedTasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

// get tasks from a household
router.get('/all/:email', async (req, res) => {

    let householdID = await findHousehold({ email: req.params.email });
    householdID = householdID?.id;

    try {
        const tasks = await TaskModel.find({ householdID });

        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

// create new task
router.post('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const taskToCreate = req.body as Task;

    try {

        if (taskToCreate.visibleToAll) {
            taskToCreate.visibleTo = [];

        } else {
            const visibleTo = await Promise.all(taskToCreate.visibleTo.map(async (userName) => {

                const user = await findUser({ userName, householdID });
                if (!user) {
                    throw 'Invalid users in visibleTo';
                }

                return user.id as string;
            }));

            taskToCreate.visibleTo = visibleTo;
        }

        const createdTask = await TaskModel.create({ householdID, ...taskToCreate });
        return res.json(createdTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

// update task
router.put('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { taskToUpdate, task } = req.body as UpdateTaskRequest;

    try {

        if (task.visibleToAll) {
            task.visibleTo = [];

        } else {
            const visibleTo = await Promise.all(task.visibleTo.map(async (userName) => {

                const user = await findUser({ userName, householdID });
                if (!user) {
                    throw 'Invalid users in visibleTo';
                }

                return user.id as string;
            }));

            task.visibleTo = visibleTo;
        }
        const updatedTask = await TaskModel.updateOne({ householdID, taskName: taskToUpdate }, { householdID, ...task });
        return res.json(updatedTask ? true : false);

    } catch (error) {
        return badRequest(res, error);
    }
});

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
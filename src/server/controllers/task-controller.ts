import express from 'express';

import TaskModel from '../model/task-model';
import UserModel from '../model/user-model';

import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';
import { getHouseholdID, findUser, findTasks, findHousehold, getUserID } from '../utils/mongo-utils';

const router = express.Router();

// get all tasks from a household
router.get('/all', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);

    try {
        const tasks = await findTasks({ householdID });

        // convert visibleTo array to contain user names instead of user ids
        const tasksWithUserObjects = await Promise.all(tasks.map(async task => {
            task.visibleTo = await Promise.all(task.visibleTo.map(async userID =>
                (await findUser({ _id: userID })).userName
            ));
            return task;
        }));

        return res.json(tasksWithUserObjects);

    } catch (error) {
        return badRequest(res, error);
    }
});

// get tasks from a household for a specific user
router.get('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const userID = getUserID(req);

        const tasks = await findTasks({ householdID, visibleToEveryone: true });
        const privateTasks = await findTasks({ householdID, visibleTo: { '$in': [userID] }, visibleToEveryone: false });
        tasks.push(...privateTasks);

        // convert visibleTo array to contain user objects instead of user ids
        const tasksWithUserObjects = await Promise.all(tasks.map(async task => {
            task.visibleTo = await Promise.all(task.visibleTo.map(async userID => {
                const user = await findUser({ _id: userID });
                return user.userName;
            }));
            return task;
        }));

        return res.json(tasksWithUserObjects);

    } catch (error) {
        return badRequest(res, error);
    }
});

// create new task
router.post('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const taskToCreate = req.body as Task;

        if (!taskToCreate.visibleToEveryone && (!taskToCreate.visibleTo || !taskToCreate.visibleTo.length)) {
            throw 'Task needs to be visible to at least one person';

        } else {

            if (!taskToCreate.visibleToEveryone) {
                const visibleTo = await Promise.all(taskToCreate.visibleTo.map(async (userName) => {

                    const user = await UserModel.findOne({ userName, householdID });
                    if (!user) {
                        throw 'Invalid users in visibleTo';
                    }

                    return user.id as string;
                }));

                taskToCreate.visibleTo = visibleTo;
            } else {
                taskToCreate.visibleTo = [];
            }
        }

        const createdTask = await TaskModel.create({ householdID, ...taskToCreate });
        return res.json(createdTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

// update task
router.put('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const { taskToUpdate, task } = req.body as UpdateTaskRequest;

        if (!task.visibleToEveryone && (!task.visibleTo || !task.visibleTo.length)) {
            throw 'Task needs to be visible to at least one person';

        } else {
            if (!task.visibleToEveryone) {

                const visibleTo = await Promise.all(task.visibleTo.map(async (userName) => {

                    const user = await UserModel.findOne({ userName, householdID });
                    if (!user) {
                        throw 'Invalid users in visibleTo';
                    }

                    return user.id as string;
                }));

                task.visibleTo = visibleTo;
            } else {
                task.visibleTo = [];
            }
        }

        const updatedTask = await TaskModel.updateOne({ householdID, taskName: taskToUpdate }, { householdID, ...task });
        return res.json(updatedTask ? true : false);

    } catch (error) {
        return badRequest(res, error);
    }
});

// delete task
router.delete('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const { taskName } = req.body as DeleteTaskRequest;

        const deletedTask = await TaskModel.findOneAndDelete({ householdID, taskName });
        return res.json(deletedTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

//////////////////////////////// DEV ////////////////////////////////

// get all tasks
router.get('/dev/dev', async (_req, res) => {
    try {
        const tasks = await TaskModel.find();
        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

// get tasks from a household
router.get('/dev/:email', async (req, res) => {
    try {
        let household = await findHousehold({ email: req.params.email });

        if (!household) {
            return badRequest(res, 'Cannot find any email');
        }

        const tasks = await TaskModel.find({ householdID: household.id });

        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
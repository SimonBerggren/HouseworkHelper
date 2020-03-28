import express from 'express';

import { findTasks, createTask, updateTask, deleteTask } from '../model/task-model';

import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';
import { getHouseholdID, findHousehold, getUserID } from '../utils/mongo-utils';
import { findUser, findUserByID } from '../model/user-model';

const router = express.Router();

// get all tasks from a household
router.get('/all', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);

        const tasks = await findTasks(householdID);

        // convert visibleTo array to contain user names instead of user ids
        const tasksWithUserObjects = await Promise.all(tasks.map(async task => {

            task.visibleTo = await Promise.all(task.visibleTo.map(async userID =>
                (await findUserByID(userID)).userName
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

        const tasks = await findTasks(householdID, userID);

        // convert visibleTo array to contain user objects instead of user ids
        const tasksWithUserObjects = await Promise.all(tasks.map(async task => {
            task.visibleTo = await Promise.all(task.visibleTo.map(async userID =>
                (await findUserByID(userID)).userName
            ));
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
                const visibleTo = await Promise.all(taskToCreate.visibleTo.map(async (userName) =>
                    (await findUser(householdID, userName)).id
                ));

                taskToCreate.visibleTo = visibleTo;
            } else {
                taskToCreate.visibleTo = [];
            }
        }

        const createdTask = await createTask(householdID, taskToCreate);

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

                const visibleTo = await Promise.all(task.visibleTo.map(async (userName) =>
                    (await findUser(householdID, userName)).id
                ));

                task.visibleTo = visibleTo;
            } else {
                task.visibleTo = [];
            }
        }

        const updatedTask = await updateTask(householdID, taskToUpdate, task);

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

        const deletedTask = await deleteTask(householdID, taskName);

        return res.json(deletedTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

//////////////////////////////// DEV ////////////////////////////////

// get all tasks
router.get('/dev/dev', async (_req, res) => {
    try {
        const tasks = await findTasks();
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

        const tasks = await findTasks(household.id);

        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
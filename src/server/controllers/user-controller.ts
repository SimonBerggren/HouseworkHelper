import express from 'express';

import UserModel from '../model/user.model';

import { authenticate } from '../authentication/authentication';
import { getHouseholdID, findTasks, findUsers, findUser } from '../utils/mongo-utils';
import { badRequest } from '../error';
import TaskModel from '../model/task-model';

const router = express.Router();

// get users from household
router.get('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);

    try {
        const users = await findUsers({ householdID });
        return res.json(users);

    } catch (error) {
        return badRequest(res, error);
    }
});

// create new user
router.post('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { userName } = req.body as CreateUserRequest;

    try {
        const createdUser = await UserModel.create({ householdID, userName });
        return res.json(createdUser);

    } catch (error) {
        return badRequest(res, error);
    }
});

// update user
router.put('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { oldUserName, newUserName } = req.body as UpdateUserRequest;

    try {
        const oldUser = await findUser({ householdID, userName: oldUserName });

        const newUser = await UserModel.findOne({ householdID, userName: newUserName });

        if (newUser) {
            throw 'User already exist';
        }
        oldUser.userName = newUserName;
        const updatedUser = await oldUser.save();

        return res.json(updatedUser.userName);

    } catch (error) {
        return badRequest(res, error);
    }
});

// delete user
router.delete('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { userName } = req.body as DeleteUserRequest;

    try {
        const deletedUser = await UserModel.findOneAndDelete({ householdID, userName });

        if (!deletedUser) {
            console.log('Could not delete', userName);

        } else {
            const tasks = await findTasks({ householdID, visibleTo: { '$in': [deletedUser.id] }, visibleToAll: false });

            await Promise.all(tasks.map(async task => {
                task.visibleTo = task.visibleTo.filter(userID => userID !== deletedUser.id);

                if (!task.visibleTo.length) {
                    const deletedTask = await TaskModel.findOneAndDelete({ _id: task.id });

                    if (!deletedTask) {
                        throw 'Something went wrong';
                    }

                } else {
                    task.save();
                }

                return task;
            }));
        }

        return res.json(deletedUser);

    } catch (error) {
        console.log('Error while deleting', userName);
        console.log(error);
        return badRequest(res, `Could not delete ${userName}`);
    }
});

export default router;
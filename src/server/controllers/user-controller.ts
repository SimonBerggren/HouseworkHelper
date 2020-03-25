import express from 'express';
import bcrypt from 'bcrypt';

import UserModel from '../model/user-model';
import TaskModel from '../model/task-model';

import { getHouseholdID, findTasks, findUsers } from '../utils/mongo-utils';
import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';

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
    const { user } = req.body as CreateUserRequest;

    if (user.password === '********') {
        delete user.password;
    }

    try {
        const createdUser = await UserModel.create({ householdID, ...user });
        return res.json(createdUser);

    } catch (error) {
        return badRequest(res, error);
    }
});

// update user
router.put('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { userToUpdate, user } = req.body as UpdateUserRequest;

    try {
        if (userToUpdate != user.userName) {
            const existingUser = await UserModel.findOne({ householdID, userName: user.userName });

            if (existingUser) {
                return badRequest(res, 'User already exist');
            }
        }

        const existingUser = await UserModel.findOne({ householdID, userName: userToUpdate });

        if (!existingUser) {
            throw 'Cannot find user';
        }

        existingUser.userName = user.userName;
        existingUser.profilePicture = user.profilePicture;

        if (existingUser.password) {
            const correctPassword = user.password && await bcrypt.compare(user.password, existingUser.password);
            if (correctPassword) {
                existingUser.password = user.password;
            } else {
                return badRequest(res, 'Invalid password');
            }
        }

        await existingUser.save();

        return res.json(true);

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
            return badRequest(res, `Could not delete ${userName}`);

        }
        const tasks = await findTasks({ householdID, visibleTo: { '$in': [deletedUser.id] } });

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

        return res.json(deletedUser);

    } catch (error) {
        console.log('Error while deleting', userName);
        console.log(error);
        return badRequest(res, `Could not delete ${userName}`);
    }
});

//////////////////////////////// DEV ////////////////////////////////

// get all users
router.get('/dev', async (_req, res) => {

    try {
        const users = await findUsers();
        return res.json(users);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
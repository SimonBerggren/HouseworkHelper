import express from 'express';
import bcrypt from 'bcrypt';

import UserViewModel from '../view/user-view-model';

import { findUser, findUsers, createUser, deleteUser, updateUser, userExist } from '../model/user-model';
import { authenticate, getHouseholdID } from '../authentication/authentication';
import { badRequest } from '../error';

const router = express.Router();

// get users from household
router.get('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);

        const users = await findUsers(householdID);

        const viewModels = users.map(user => new UserViewModel(user));

        return res.json(viewModels);

    } catch (error) {
        return badRequest(res, error);
    }
});

// create new user
router.post('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const { user } = req.body as CreateUserRequest;

        if (await userExist(householdID, user.userName)) {
            throw 'User already exist';
        }

        await createUser(householdID, user);

        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

// update user
router.put('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const { userToUpdate, password, user } = req.body as UpdateUserRequest;

        if (userToUpdate !== user.userName && userExist(householdID, user.userName)) {
            throw 'User already exist';
        }

        const existingUser = await findUser(householdID, userToUpdate);

        if (existingUser.password) {
            const correctPassword = password && await bcrypt.compare(password, existingUser.password);

            if (correctPassword) {
                await updateUser(householdID, userToUpdate, user);
            } else {
                throw 'Invalid credentials';
            }
        } else {
            await updateUser(householdID, userToUpdate, user);
        }

        await existingUser.save();

        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

// delete user
router.delete('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const { userName } = req.body as DeleteUserRequest;

        await deleteUser(householdID, userName);

        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

//////////////////////////////// DEV ////////////////////////////////

// get all users
router.get('/dev', async (_req, res) => {
    try {
        const users = await findUsers();

        const viewModels = users.map(user => new UserViewModel(user));

        return res.json(viewModels);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
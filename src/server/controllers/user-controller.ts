import express from 'express';
import bcrypt from 'bcrypt';

import { findUser, findUsers, createUser, deleteUser, updateUser } from '../model/user-model';
import { authenticate, getHouseholdID } from '../authentication/authentication';
import { badRequest } from '../error';

const router = express.Router();

// get users from household
router.get('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);

        const users = await findUsers(householdID);

        return res.json(users);

    } catch (error) {
        return badRequest(res, error);
    }
});

// create new user
router.post('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const { user } = req.body as CreateUserRequest;

        const createdUser = await createUser(householdID, user);

        return res.json(createdUser);

    } catch (error) {
        return badRequest(res, error);
    }
});

// update user
router.put('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const { userToUpdate, user } = req.body as UpdateUserRequest;

        if (userToUpdate !== user.userName) {
            const existingUser = await findUser(householdID, user.userName);

            if (existingUser) {
                throw 'User already exist';
            }
        }

        const existingUser = await findUser(householdID, userToUpdate);

        if (existingUser.password) {
            const correctPassword = user.password && await bcrypt.compare(user.password, existingUser.password);

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

        const deletedUser = await deleteUser(householdID, userName);

        return res.json(deletedUser);

    } catch (error) {
        return badRequest(res, error);
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
import express from 'express';

import UserModel from '../model/user.model';

import { authenticate } from '../authentication/authentication';
import { getHouseholdID } from '../utils/mongo-utils';
import { badRequest } from '../error';

const router = express.Router();

// get users from household
router.get('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);

    try {
        const users = await UserModel.find({ householdID });
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

// delete user
router.delete('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { userName } = req.body as DeleteUserRequest;

    try {
        const deletedUser = await UserModel.findOneAndDelete({ householdID, userName });
        return res.json(deletedUser);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
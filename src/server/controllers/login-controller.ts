import express from 'express';
import bcrypt from 'bcrypt';

import UserModel from '../model/user-model';

import { generateToken, authenticate } from '../authentication/authentication';
import { findHousehold, getHouseholdID } from '../utils/mongo-utils';
import { badRequest } from '../error';

const router = express.Router();

// login as existing household
router.post('/', async (req, res) => {

    const { email, password } = req.body as Household;

    try {
        const existingHousehold = await findHousehold({ email });
        const correctPassword = await bcrypt.compare(password, existingHousehold.password);

        if (correctPassword) {
            const token = generateToken(email);
            return res.json(token);
        }

        return badRequest(res, 'Invalid Credentials');

    } catch (error) {
        return badRequest(res, 'Invalid Credentials');
    }
});

// login as existing user
router.post('/user', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { userName, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ householdID, userName });

        if (!existingUser || !existingUser.password) {
            return badRequest(res, 'Cannot login user');
        }

        const correctPassword = await bcrypt.compare(password, existingUser.password);

        if (correctPassword) {
            const token = generateToken(userName);
            return res.json(token);
        }

        return badRequest(res, 'Invalid Credentials');

    } catch (error) {
        return badRequest(res, 'Invalid Credentials');
    }
});

export default router;
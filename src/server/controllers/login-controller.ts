import express from 'express';
import bcrypt from 'bcrypt';

import UserModel from '../model/user-model';

import { generateEmailToken, authenticate, generateUserToken } from '../authentication/authentication';
import { findHousehold, getHousehold } from '../utils/mongo-utils';
import { badRequest } from '../error';

const router = express.Router();

// login as existing household
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body as Household;

        const existingHousehold = await findHousehold({ email });
        const correctPassword = await bcrypt.compare(password, existingHousehold.password);

        if (!correctPassword) {
            throw '';
        }

        const token = generateEmailToken(email);
        
        return res.json(token);

    } catch (error) {
        return badRequest(res, 'Invalid credentials');
    }
});

// login as existing user
router.post('/user', authenticate(), async (req, res) => {
    try {
        const household = getHousehold(req);
        const { userName, password } = req.body;

        const existingUser = await UserModel.findOne({ householdID: household.id, userName });

        if (!existingUser || !existingUser.password) {
            throw '';
        }

        const correctPassword = await bcrypt.compare(password, existingUser.password);

        if (!correctPassword) {
            throw '';
        }

        const token = generateUserToken(household.email, userName);

        return res.json(token);

    } catch (error) {
        return badRequest(res, 'Invalid credentials');
    }
});

export default router;
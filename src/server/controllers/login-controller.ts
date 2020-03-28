import express from 'express';
import bcrypt from 'bcrypt';

import { getHousehold, authenticate, generateEmailToken, generateUserToken } from '../authentication/authentication';
import { findHousehold } from '../model/household-model';
import { findUser } from '../model/user-model';
import { badRequest } from '../error';

const router = express.Router();

// login as existing household
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body as Household;

        const existingHousehold = await findHousehold(email);
        const correctPassword = await bcrypt.compare(password, existingHousehold.password);

        if (!correctPassword) {
            throw '';
        }

        const token = generateEmailToken(email);

        return res.json(token);

    } catch {
        return badRequest(res, 'Invalid credentials');
    }
});

// login as existing user
router.post('/user', authenticate(), async (req, res) => {
    try {
        const { userName, password } = req.body;
        const household = getHousehold(req);

        const existingUser = await findUser(household.id, userName);

        if (existingUser.password) {
            const correctPassword = await bcrypt.compare(password, existingUser.password);

            if (!correctPassword) {
                throw '';
            }
        }

        const token = generateUserToken(household.email, userName);

        return res.json(token);

    } catch {
        return badRequest(res, 'Invalid credentials');
    }
});

export default router;
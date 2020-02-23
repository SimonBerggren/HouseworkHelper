import express from 'express';
import bcrypt from 'bcrypt';

import { generateToken } from '../authentication/authentication';
import { findHousehold } from '../utils/mongo-utils';
import { badRequest } from '../error';

const router = express.Router();

router.post('/', async (req, res) => {

    const household = req.body as Household;

    try {
        const existingHousehold = await findHousehold({ email: household.email });
        const correctPassword = await bcrypt.compare(household.password, existingHousehold.password);

        if (correctPassword) {
            const token = generateToken(household);
            return res.json(token);
        }

        return badRequest(res, 'Invalid Credentials');

    } catch (error) {
        return badRequest(res, 'Invalid Credentials');
    }
});

export default router;
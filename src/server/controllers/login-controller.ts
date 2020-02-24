import express from 'express';
import bcrypt from 'bcrypt';

import { generateToken } from '../authentication/authentication';
import { findHousehold } from '../utils/mongo-utils';
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

export default router;
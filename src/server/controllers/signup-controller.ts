import express from 'express';

import { findHousehold, createHousehold } from '../model/household-model';
import { badRequest } from '../error';

const router = express.Router();

// sign up as new household
router.post('/', async (req, res) => {
    try {
        const { email, householdName, password } = req.body as Household;

        const existingHousehold = await findHousehold(email);

        if (existingHousehold) {
            throw 'Email is already in use';
        }

        await createHousehold(email, householdName, password);

        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
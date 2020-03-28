import express from 'express';

import { createHousehold, householdExist } from '../model/household-model';
import { badRequest } from '../error';

const router = express.Router();

// sign up as new household
router.post('/', async (req, res) => {
    try {
        const { email, householdName, password } = req.body as Household;

        if (await householdExist(email)) {
            throw 'Email is already in use';
        }

        await createHousehold(email, householdName, password);

        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
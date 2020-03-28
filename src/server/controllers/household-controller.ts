import express from 'express';

import { authenticate, getHousehold } from '../authentication/authentication';
import { findHouseholds } from '../model/household-model';
import { badRequest } from '../error';

const router = express.Router();

// get household info
router.get('/', authenticate(), async (req, res) => {
    try {
        const { householdName, email } = getHousehold(req);

        return res.json({ email, householdName });

    } catch (error) {
        return badRequest(res, error);
    }
});

//////////////////////////////// DEV ////////////////////////////////

// get all households
router.get('/dev', async (_req, res) => {
    try {
        const households = await findHouseholds();

        return res.json(households);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
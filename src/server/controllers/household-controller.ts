import express from 'express';

import { getHouseholdID } from '../utils/mongo-utils';
import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';
import HouseholdModel from '../model/household-model';

const router = express.Router();

// get household info
router.get('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);

    try {
        const household = await HouseholdModel.findById(householdID);
        return res.json({ email: household?.email, householdName: household?.householdName });

    } catch (error) {
        return badRequest(res, error);
    }
});

//////////////////////////////// DEV ////////////////////////////////

// get all households
router.get('/dev',  async (_req, res) => {

    try {
        const households = await HouseholdModel.find();
        return res.json(households);

    } catch (error) {
        return badRequest(res, error);
    }
});


export default router;
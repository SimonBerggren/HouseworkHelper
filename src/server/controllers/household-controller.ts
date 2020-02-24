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
        return res.json(household);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
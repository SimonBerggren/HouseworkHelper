import express from 'express';

import HouseholdModel from '../model/household-model';

import { badRequest } from '../error';

const router = express.Router();

router.post('/', async (req, res) => {

    const newHousehold = req.body as Household;

    try {
        await HouseholdModel.create(newHousehold);
        return res.json('Created new household');

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
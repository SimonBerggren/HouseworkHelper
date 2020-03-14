import express from 'express';

import HouseholdModel from '../model/household-model';

import { badRequest } from '../error';

const router = express.Router();

// sign up as new household
router.post('/', async (req, res) => {

    const newHousehold = req.body as Household;

    try {
        const existingHousehold = await HouseholdModel.findOne({ email: newHousehold.email });

        if (existingHousehold) {
            return badRequest(res, 'Email is already in use');
        }

        const createdHousehold = await HouseholdModel.create(newHousehold);

        if (createdHousehold) {
            return res.json(true);
        }

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
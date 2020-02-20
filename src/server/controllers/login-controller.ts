import express from 'express';
import bcrypt from 'bcrypt';

import HouseholdModel from '../model/household-model';

const router = express.Router();

router.post('/', async (req, res) => {

    const household = req.body as Household;

    HouseholdModel.findOne({ email: household.email })
        .then(async existingHousehold => {

            if (existingHousehold) {
                const correctPassword = await bcrypt.compare(household.password, existingHousehold.password);

                if (correctPassword) {
                    const token = await existingHousehold.generateAuthToken();
                    return res.status(201).json(token);
                }
            }

            return res.status(400).json('Invalid credentials');
        })
        .catch(error => res.status(400).json(error));
});

export default router;
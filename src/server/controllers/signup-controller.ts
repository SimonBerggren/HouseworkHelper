import express from 'express';

import HouseholdModel from '../model/household-model';

const router = express.Router();

router.post('/', async (req, res) => {

    const newHousehold = req.body as Household;

    HouseholdModel.findOne({ email: newHousehold.email })
        .then(existingHousehold => {

            if (existingHousehold) {
                return res.status(400).json('Email is already in use');
            } else {
                return HouseholdModel.create(newHousehold)
                    .then(createdHousehold => res.status(201).json(createdHousehold.email));
            }
        })
        .catch(error => res.status(401).json(error));
});

export default router;
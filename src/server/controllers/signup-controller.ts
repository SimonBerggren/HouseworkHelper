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
                HouseholdModel.create(newHousehold)
                    .then(createdHousehold => res.status(201).json(createdHousehold.email))
                    .catch(error => res.status(401).json(error));
            }
        });
});
router.get('/', async (_req, res) => {
    const houseHolds = await HouseholdModel.find();
    return res.json(houseHolds);
});

router.get('/drop', async (_req, res) => {
    HouseholdModel.collection.drop();
    res.json('dropped');
});

export default router;
import express from 'express';
import HouseholdModel from '../model/household-model';

const router = express.Router();

router.post('/', async (req, res) => {

    const newHousehold = req.body as Household;

    HouseholdModel.findOne({ email: newHousehold.email })
        .then(existingHousehold => {
            if (existingHousehold) {
                res.statusCode = 400;
                return res.json('That email is already used.');
            } else {
                HouseholdModel.create(newHousehold)
                    .then(() => {
                        res.statusCode = 201;
                        return res.json('User created');
                    })
                    .catch(error => {
                        res.statusCode = 500;
                        return res.json(error);
                    });
            }
        });

});

router.get('/', async (req, res) => {
    const houseHolds = await HouseholdModel.find();
    return res.send(houseHolds);
});

export default router;
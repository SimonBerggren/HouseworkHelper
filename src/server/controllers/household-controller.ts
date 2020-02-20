import express from 'express';

import HouseholdModel from '../model/household-model';
import { authenticate } from '../authentication';

const router = express.Router();

router.get('/', authenticate(), async (req, res) => {

    const { email } = req.user as Household;

    HouseholdModel.findOne({ email })
        .then(household => res.json(household))
        .catch(error => res.status(400).json(error));
});

export default router;
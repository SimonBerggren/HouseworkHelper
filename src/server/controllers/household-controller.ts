import passport from 'passport';
import express from 'express';

import HouseholdModel from '../model/household-model';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false, failWithError: true }), async (req, res) => {

    const { email } = req.user as Household;

    HouseholdModel.findOne({ email }).then(household => res.json(household));
});

export default router;
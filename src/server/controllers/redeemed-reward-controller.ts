import express from 'express';

import { findLatestRedeemedRewards, createRedeemedReward } from '../model/redeemed-reward-model';

import { authenticate, getHouseholdID, getUser } from '../authentication/authentication';
import { findReward } from '../model/reward-model';
import { badRequest } from '../error';

const router = express.Router();

// get latest redeemed rewards in household
router.get('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const uglyHardCodedLimit = 20;

        const redeemedRewards = await findLatestRedeemedRewards(uglyHardCodedLimit, householdID);

        return res.json(redeemedRewards);

    } catch (error) {
        return badRequest(res, error);
    }

});

// redeem reward
router.post('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const { rewardName } = req.body as RedeemRewardRequest;
        const user = getUser(req);

        const rewardToRedeem = await findReward(householdID, rewardName);

        if (user.points - rewardToRedeem.points < 0) {
            throw 'Insufficient points';
        }

        await createRedeemedReward(householdID, user.id, rewardToRedeem.id);

        user.points -= rewardToRedeem.points;
        user.save();

        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
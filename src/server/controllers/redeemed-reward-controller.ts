import express from 'express';

import RedeemedRewardModel from '../model/redeemed-reward-model';

import { getHouseholdID, findReward, getUser } from '../utils/mongo-utils';
import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';

const router = express.Router();

// get 20 latest redeemed rewards in household
router.get('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);

        const redeemedRewards = await RedeemedRewardModel.find({ householdID }, undefined).sort({ 'date': -1 }).limit(20);

        return res.json(redeemedRewards);

    } catch (error) {
        return badRequest(res, error);
    }

});

// redeem reward
router.post('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const user = getUser(req);
        const { rewardName } = req.body as RedeemRewardRequest;

        const rewardToComplete = await findReward({ householdID, rewardName });

        if (user.points - rewardToComplete.points < 0) {
            throw 'Insufficient points';
        }

        const redeemedReward: RedeemedReward = {
            householdID,
            rewardID: rewardToComplete.id,
            userID: user.id,
            date: Date.now()
        };

        const createdRedeemedReward = await RedeemedRewardModel.create(redeemedReward);

        if (!createdRedeemedReward) {
            throw 'Unable to redeem reward';
        }

        user.points -= rewardToComplete.points;
        user.save();
        
        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
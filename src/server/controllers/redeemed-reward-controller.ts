import express from 'express';

import RedeemedRewardModel from '../model/redeemed-reward-model';
import UserModel from '../model/user-model';

import { getHouseholdID, findReward } from '../utils/mongo-utils';
import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';

const router = express.Router();

// get 20 latest redeemed rewards in household
router.get('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);

    const redeemedRewards = await RedeemedRewardModel.find({ householdID }, undefined).sort({ 'date': -1 }).limit(20);
    return res.json(redeemedRewards);
});

// redeem reward
router.post('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { rewardName, userName } = req.body as RedeemRewardRequest;

    try {
        const rewardToComplete = await findReward({ householdID, rewardName: rewardName });
        const user = await UserModel.findOne({ householdID, userName });

        if (!user) {
            return badRequest(res, 'Cannot find user');
        } else if (user.points - rewardToComplete.points < 0) {
            return badRequest(res, 'Insufficient points');
        }

        const redeemedReward: RedeemedReward = {
            householdID,
            rewardID: rewardToComplete.id,
            userID: user.id,
            date: Date.now()
        };

        const createdRedeemedReward = await RedeemedRewardModel.create(redeemedReward);

        if (createdRedeemedReward) {

            user.points -= rewardToComplete.points;
            user.save();

            return res.json(true);
        }

        return res.json(false);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
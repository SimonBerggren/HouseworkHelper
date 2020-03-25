import express from 'express';

import UserModel from '../model/user-model';

import { authenticate } from '../authentication/authentication';
import { badRequest } from '../error';
import { getHouseholdID, findUser, findRewards, findHousehold } from '../utils/mongo-utils';
import RewardModel from '../model/reward-model';

const router = express.Router();

// get rewards from a household for a specific user
router.get('/:user', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);

    try {
        const user = await UserModel.findOne({ householdID, userName: req.params.user });

        if (!user) {
            return badRequest(res, 'Could not find user');
        }

        const rewards = await findRewards({ householdID, visibleToEveryone: true });
        const privateRewards = await findRewards({ householdID, visibleTo: { '$in': [user.id] }, visibleToEveryone: false });
        rewards.push(...privateRewards);

        const mappedRewards = await Promise.all(rewards.map(async reward => {
            reward.visibleTo = await Promise.all(reward.visibleTo.map(async userID => {
                const user = await findUser({ _id: userID });
                return user.userName;
            }));
            return reward;
        }));

        return res.json(mappedRewards);

    } catch (error) {
        return badRequest(res, error);
    }
});

// create new reward
router.post('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const rewardToCreate = req.body as Reward;

    try {

        if (!rewardToCreate.visibleToEveryone && (!rewardToCreate.visibleTo || !rewardToCreate.visibleTo.length)) {
            throw 'Reward needs to be visible to at least one person';

        } else {

            if (!rewardToCreate.visibleToEveryone) {
                const visibleTo = await Promise.all(rewardToCreate.visibleTo.map(async (userName) => {

                    const user = await UserModel.findOne({ userName, householdID });
                    if (!user) {
                        throw 'Invalid users in visibleTo';
                    }

                    return user.id as string;
                }));

                rewardToCreate.visibleTo = visibleTo;
            } else {
                rewardToCreate.visibleTo = [];
            }
        }

        const createdTask = await RewardModel.create({ householdID, ...rewardToCreate });
        return res.json(createdTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

// update reward
router.put('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { rewardToUpdate, reward } = req.body as UpdateRewardRequest;

    try {

        if (!reward.visibleToEveryone && (!reward.visibleTo || !reward.visibleTo.length)) {
            throw 'Task needs to be visible to at least one person';

        } else {
            if (!reward.visibleToEveryone) {

                const visibleTo = await Promise.all(reward.visibleTo.map(async (userName) => {

                    const user = await UserModel.findOne({ userName, householdID });
                    if (!user) {
                        throw 'Invalid users in visibleTo';
                    }

                    return user.id as string;
                }));

                reward.visibleTo = visibleTo;
            } else {
                reward.visibleTo = [];
            }
        }

        const updatedReward = await RewardModel.updateOne({ householdID, rewardName: rewardToUpdate }, { householdID, ...reward });
        return res.json(updatedReward ? true : false);

    } catch (error) {
        return badRequest(res, error);
    }
});

// delete reward
router.delete('/', authenticate(), async (req, res) => {

    const householdID = getHouseholdID(req);
    const { rewardName } = req.body as DeleteRewardRequest;

    try {
        const deletedReward = await RewardModel.findOneAndDelete({ householdID, rewardName });
        return res.json(deletedReward);

    } catch (error) {
        return badRequest(res, error);
    }
});

//////////////////////////////// DEV ////////////////////////////////

// get all users
router.get('/dev/dev', async (_req, res) => {

    try {
        const tasks = await RewardModel.find();
        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

// get tasks from a household
router.get('/dev/:email', async (req, res) => {

    try {

        let household = await findHousehold({ email: req.params.email });

        if (!household) {
            return badRequest(res, 'Cannot find any email');
        }

        const tasks = await RewardModel.find({ householdID: household.id });

        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
import express from 'express';

import { findRewards, createReward, updateReward, deleteReward } from '../model/reward-model';
import { authenticate, getHouseholdID, getUserID } from '../authentication/authentication';
import { findUser, findUserByID } from '../model/user-model';
import { findHousehold } from '../model/household-model';
import { badRequest } from '../error';

const router = express.Router();

// get all rewards from a household
router.get('/all', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);

        const rewards = await findRewards(householdID);

        // convert visibleTo array to contain user names instead of user ids
        const rewardsWithUserNames = await Promise.all(rewards.map(async reward => {
            reward.visibleTo = await Promise.all(reward.visibleTo.map(async userID =>
                (await findUserByID(userID)).userName
            ));
            return reward;
        }));

        return res.json(rewardsWithUserNames);

    } catch (error) {
        return badRequest(res, error);
    }
});

// get rewards from a household for a specific user
router.get('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const userID = getUserID(req);

        const rewards = await findRewards(householdID, userID);

        // convert visibleTo array to contain user names instead of user ids
        const rewardsWithUserNames = await Promise.all(rewards.map(async reward => {
            reward.visibleTo = await Promise.all(reward.visibleTo.map(async userID =>
                (await findUserByID(userID)).userName
            ));
            return reward;
        }));

        return res.json(rewardsWithUserNames);

    } catch (error) {
        return badRequest(res, error);
    }
});

// create new reward
router.post('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const rewardToCreate = req.body as Reward;

        if (!rewardToCreate.visibleToEveryone && (!rewardToCreate.visibleTo || !rewardToCreate.visibleTo.length)) {
            throw 'Reward needs to be visible to at least one person';

        } else {

            if (!rewardToCreate.visibleToEveryone) {
                // convert visibleTo array to contain user ids instead of user objects
                const visibleTo = await Promise.all(rewardToCreate.visibleTo.map(async userName =>
                    (await findUser(householdID, userName)).id
                ));

                rewardToCreate.visibleTo = visibleTo;
            } else {
                rewardToCreate.visibleTo = [];
            }
        }

        const createdTask = await createReward(householdID, rewardToCreate);

        return res.json(createdTask);

    } catch (error) {
        return badRequest(res, error);
    }
});

// update reward
router.put('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const { rewardToUpdate, reward } = req.body as UpdateRewardRequest;

        if (!reward.visibleToEveryone && (!reward.visibleTo || !reward.visibleTo.length)) {
            throw 'Task needs to be visible to at least one person';

        } else {
            if (!reward.visibleToEveryone) {

                // convert visibleTo array to contain user ids instead of user objects
                const visibleTo = await Promise.all(reward.visibleTo.map(async (userName) =>
                    (await findUser(householdID, userName)).id
                ));

                reward.visibleTo = visibleTo;
            } else {
                reward.visibleTo = [];
            }
        }

        await updateReward(householdID, rewardToUpdate, reward);

        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

// delete reward
router.delete('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const { rewardName } = req.body as DeleteRewardRequest;

        const deletedReward = await deleteReward(householdID, rewardName);

        return res.json(deletedReward);

    } catch (error) {
        return badRequest(res, error);
    }
});

//////////////////////////////// DEV ////////////////////////////////

// get all users
router.get('/dev/dev', async (_req, res) => {

    try {
        const tasks = await findRewards();
        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

// get tasks from a household
router.get('/dev/:email', async (req, res) => {
    try {
        const household = await findHousehold(req.params.email);

        if (!household) {
            return badRequest(res, 'Cannot find any email');
        }

        const tasks = await findRewards(household.id);

        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
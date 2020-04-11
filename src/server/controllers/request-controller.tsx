import express from 'express';

import { findLatestRequestDoTasks, createRequestDoTask, findRequestDoTasks } from '../model/request-do-task-model';
import { authenticate, getHouseholdID, getUserID, getUser } from '../authentication/authentication';
import { findUser, findUserByID } from '../model/user-model';
import { findTask } from '../model/task-model';
import { badRequest } from '../error';

const router = express.Router();

// get latest requests to user
router.get('/', authenticate(), async (req, res) => {
    try {
        const householdID = getHouseholdID(req);
        const user = getUser(req);
        const uglyHardCodedLimit = 20;

        const requestedDoTasks = await findLatestRequestDoTasks(uglyHardCodedLimit, householdID, user.id);

        const tasks = await Promise.all(requestedDoTasks.map(async (request: any) => {
            const toUser = await findUserByID(request.toUserID);

            request.toUserName = toUser.userName;
            request.fromUserName = user.userName;

            return request;
        }));

        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }

});

// request do task
router.post('/do', authenticate(), async (req, res) => {
    try {
        const request = req.body as RequestDoTask;
        const householdID = getHouseholdID(req);
        const fromUserID = getUserID(req);

        const toUser = await findUser(householdID, request.toUserName);
        const task = await findTask(householdID, request.taskName);

        await createRequestDoTask(householdID, fromUserID, toUser.id, task.id, request.points, request.comments);

        return res.json(true);

    } catch (error) {
        return badRequest(res, error);
    }
});

// request complete task
// router.post('/complete', authenticate(), async (req, res) => {
//     try {
//         const householdID = getHouseholdID(req);
//         const { rewardName } = req.body as RedeemRewardRequest;
//         const user = getUser(req);

//         const rewardToRedeem = await findReward(householdID, rewardName);

//         if (user.points - rewardToRedeem.points < 0) {
//             throw 'Insufficient points';
//         }

//         await createRedeemedReward(householdID, user.id, rewardToRedeem.id);

//         user.points -= rewardToRedeem.points;
//         user.save();

//         return res.json(true);

//     } catch (error) {
//         return badRequest(res, error);
//     }
// });

//////////////////////////////// DEV ////////////////////////////////

// get all tasks
router.get('/dev', async (_req, res) => {
    try {
        const requestedDoTasks = await findRequestDoTasks();

        const tasks = await Promise.all(requestedDoTasks.map(async (request: any) => {
            const toUser = await findUserByID(request.toUserID);
            const fromUser = await findUserByID(request.fromUserID);

            request.toUserName = toUser.userName;
            request.fromUserName = fromUser.userName;

            return request;
        }));

        return res.json(tasks);

    } catch (error) {
        return badRequest(res, error);
    }
});

export default router;
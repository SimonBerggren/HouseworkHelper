import { Document as IDocument } from 'mongoose';

import HouseholdModel from '../model/household-model';
import RewardModel from '../model/reward-model';

export const getHousehold = (request: Express.Request) => (request.user as any).household as Household & IDocument;
export const getHouseholdID = (request: Express.Request): string => getHousehold(request).id;

export const getUser = (request: Express.Request) => (request.user as any).user as User & IDocument;
export const getUserName = (request: Express.Request): string => getUser(request).userName;
export const getUserID = (request: Express.Request): string => getUser(request).id;

export const findHousehold = async (conditions: any) => {
    const household = await HouseholdModel.findOne(conditions);

    if (!household) {
        return Promise.reject('Could not find household');
    }

    return Promise.resolve(household);
};

export const findReward = async (conditions: any): Promise<Reward & IDocument> => {
    const reward = await RewardModel.findOne(conditions);

    if (!reward) {
        return Promise.reject('Could not find reward');
    }

    return Promise.resolve(reward);
};

export const findRewards = async (conditions: any): Promise<(Reward & IDocument)[]> => {
    const rewards = await RewardModel.find(conditions);

    if (!rewards) {
        return Promise.reject('Could not find any rewards');
    }

    return Promise.resolve(rewards);
};
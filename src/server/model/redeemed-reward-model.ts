import mongoose, { Schema, Document as IDocument } from 'mongoose';

import { dropAllTables, dropRedeemedRewardTable } from '../utils/dev-utils';

interface RedeemedRewardSchemaModel extends RedeemedReward, IDocument {
}

const RedeemedRewardSchema = new Schema<RedeemedRewardSchemaModel>({
    householdID: { type: String, required: true },
    rewardID: { type: String, required: true },
    userID: { type: String, required: true },
    date: { type: Date, required: true }
});

const RedeemedRewardModel = mongoose.model<RedeemedRewardSchemaModel>('redeemed-reward', RedeemedRewardSchema);

if (dropAllTables || dropRedeemedRewardTable) {
    RedeemedRewardModel.collection.drop();
}

//////////////////////////////// OPERATIONS ////////////////////////////////

export const findRedeemedRewards = async (householdID?: string, userID?: string): Promise<(RedeemedReward & IDocument)[]> => {

    // dev
    if (!householdID) {
        return await RedeemedRewardModel.find();
    }

    // adult
    if (!userID) {
        return await RedeemedRewardModel.find({ householdID });
    }

    const redeemedRewards = await RedeemedRewardModel.find({ householdID, userID });

    return redeemedRewards;
};

export const findLatestRedeemedRewards = async (limit: number, householdID?: string, userID?: string): Promise<(RedeemedReward & IDocument)[]> => {

    // dev
    if (!householdID) {
        return await RedeemedRewardModel.find().sort({ 'date': -1 }).limit(limit);
    }

    // adult
    if (!userID) {
        return await RedeemedRewardModel.find({ householdID }).sort({ 'date': -1 }).limit(limit);
    }

    const redeemedRewards = await RedeemedRewardModel.find({ householdID, userID }).sort({ 'date': -1 }).limit(limit);

    return redeemedRewards;
};

export const createRedeemedReward = async (householdID: string, userID: string, rewardID: string): Promise<(RedeemedReward & IDocument)> => {
    const createdRedeemedReward = await RedeemedRewardModel.create({ householdID, userID, rewardID, date: Date.now() });

    if (!createdRedeemedReward) {
        throw 'Unable to create redeemedReward';
    }

    return createdRedeemedReward;
};
import mongoose, { Schema, Document as IDocument } from 'mongoose';

import { dropAllTables, dropRewardTable } from '../utils/dev-utils';

interface RewardSchemaModel extends Reward, IDocument {
}

const RewardSchema = new Schema<RewardSchemaModel>({
    householdID: { type: String, required: true },
    points: { type: Number, required: true },
    rewardName: { type: String, required: true },
    desc: { type: String },
    visibleTo: { type: Array, required: true },
    visibleToEveryone: { type: Boolean, required: true }
});

RewardSchema.index({ householdID: 1, rewardName: 1 }, { unique: true });

const RewardModel = mongoose.model<RewardSchemaModel>('reward', RewardSchema);

if (dropAllTables || dropRewardTable) {
    RewardModel.collection.drop();
}

//////////////////////////////// OPERATIONS ////////////////////////////////

export const findReward = async (householdID: string, rewardName: string): Promise<Reward & IDocument> => {
    const reward = await RewardModel.findOne({ householdID, rewardName });

    if (!reward) {
        throw 'Unable to find reward';
    }

    return Promise.resolve(reward);
};

export const findRewards = async (householdID?: string, userID?: string, includeVisibleToEveryone: boolean = true): Promise<(Reward & IDocument)[]> => {

    // dev
    if (!householdID) {
        return await RewardModel.find();
    }

    // adult
    if (!userID) {
        return await RewardModel.find({ householdID });
    }

    const publicRewards = includeVisibleToEveryone && await RewardModel.find({ householdID, visibleToEveryone: true });
    const privateRewards = await RewardModel.find({ householdID, visibleToEveryone: false, visibleTo: { '$in': [userID] } });

    return publicRewards ? publicRewards.concat(privateRewards) : privateRewards;
};

export const createReward = async (householdID: string, rewardToCreate: Reward): Promise<(Reward & IDocument)> => {
    const createdReward = await RewardModel.create({ householdID, ...rewardToCreate });

    if (!createdReward) {
        throw 'Unable to create reward';
    }

    return createdReward;
};

export const updateReward = async (householdID: string, rewardName: string, rewardToUpdate: Reward): Promise<(Reward & IDocument)> => {
    const reward = await RewardModel.updateOne({ householdID, rewardName }, { householdID, ...rewardToUpdate });

    if (!reward) {
        throw 'Unable to update reward';
    }

    return reward;
};

export const deleteReward = async (householdID: string, rewardName: string): Promise<(Reward & IDocument)> => {
    const deletedReward = await RewardModel.findOneAndDelete({ householdID, rewardName });

    if (!deletedReward) {
        throw 'Unable to delete reward';
    }

    return deletedReward;
};
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

export default RewardModel;
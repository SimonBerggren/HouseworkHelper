import mongoose, { Schema, Document as IDocument } from 'mongoose';

import { dropAllTables, dropRedeemedRewardTable } from '../utils/dev-utils';

interface RedeemedRewardSchemaModel extends Reward, IDocument {
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

export default RedeemedRewardModel;
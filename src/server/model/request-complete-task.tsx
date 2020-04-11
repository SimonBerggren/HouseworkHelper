import mongoose, { Schema, Document as IDocument } from 'mongoose';

import { dropAllTables, dropRequestCompleteTaskTable } from '../utils/dev-utils';

interface RequestCompleteTaskSchemaModel extends RequestCompleteTask, IDocument {
}

const RequestCompleteTaskSchema = new Schema<RequestCompleteTaskSchemaModel>({
    householdID: { type: String, required: true },
    taskID: { type: String, required: true },
    fromUserID: { type: String, required: true },
    ToUserID: { type: String, required: true },
    dateCompleted: { type: Date, required: true }
});

RequestCompleteTaskSchema.index({ fromUserID: 1, ToUserID: 1, taskID: 1, householdID: 1 }, { unique: true });

const RequestCompleteTaskModel = mongoose.model<RequestCompleteTaskSchemaModel>('request-complete-task', RequestCompleteTaskSchema);

if (dropAllTables || dropRequestCompleteTaskTable) {
    RequestCompleteTaskModel.collection.drop();
}

//////////////////////////////// OPERATIONS ////////////////////////////////

export const findRequestCompleteTasks = async (householdID?: string, userID?: string): Promise<(RequestCompleteTask & IDocument)[]> => {

    // dev
    if (!householdID) {
        return await RequestCompleteTaskModel.find();
    }

    // adult
    if (!userID) {
        return await RequestCompleteTaskModel.find({ householdID });
    }

    const RequestCompleteTasks = await RequestCompleteTaskModel.find({ householdID, userID });

    return RequestCompleteTasks;
};

export const findLatestRequestCompleteTasks = async (limit: number, householdID?: string, userID?: string): Promise<(RequestCompleteTask & IDocument)[]> => {

    // dev
    if (!householdID) {
        return await RequestCompleteTaskModel.find().sort({ 'date': -1 }).limit(limit);
    }

    // adult
    if (!userID) {
        return await RequestCompleteTaskModel.find({ householdID }).sort({ 'date': -1 }).limit(limit);
    }

    const RequestCompleteTasks = await RequestCompleteTaskModel.find({ householdID, userID }).sort({ 'date': -1 }).limit(limit);

    return RequestCompleteTasks;
};

export const createRequestCompleteTask = async (householdID: string, userID: string, rewardID: string): Promise<(RequestCompleteTask & IDocument)> => {
    const createdRequestCompleteTask = await RequestCompleteTaskModel.create({ householdID, userID, rewardID, date: Date.now() });

    if (!createdRequestCompleteTask) {
        throw 'Unable to create RequestCompleteTask';
    }

    return createdRequestCompleteTask;
};
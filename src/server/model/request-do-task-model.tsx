import mongoose, { Schema, Document as IDocument } from 'mongoose';

import { dropAllTables, dropRequestDoTaskTable } from '../utils/dev-utils';

interface RequestDoTaskSchemaModel extends RequestDoTask, IDocument {
}

const RequestDoTaskSchema = new Schema<RequestDoTaskSchemaModel>({
    householdID: { type: String, required: true },
    taskID: { type: String, required: true },
    fromUserID: { type: String, required: true },
    toUserID: { type: String, required: true },
    comments: { type: String, required: false },
    points: { type: Number, required: true },
    dateCompleted: { type: Date, required: true }
});

RequestDoTaskSchema.index({ fromUserID: 1, toUserID: 1, taskID: 1, householdID: 1 }, { unique: true });

const RequestDoTaskModel = mongoose.model<RequestDoTaskSchemaModel>('request-to-task', RequestDoTaskSchema);

if (dropAllTables || dropRequestDoTaskTable) {
    RequestDoTaskModel.collection.drop();
}

//////////////////////////////// OPERATIONS ////////////////////////////////

export const findRequestDoTasks = async (householdID?: string, toUserID?: string, fromUserID?: string, taskID?: string): Promise<(RequestDoTask & IDocument)[]> => {

    // dev
    if (!householdID) {
        return await RequestDoTaskModel.find();
    }

    const RequestDoTasks = await RequestDoTaskModel.find({ householdID, toUserID, fromUserID, taskID });

    return RequestDoTasks;
};

export const findLatestRequestDoTasks = async (limit: number, householdID?: string, toUserID?: string): Promise<(RequestDoTask & IDocument)[]> => {

    // dev
    if (!householdID) {
        return await RequestDoTaskModel.find().sort({ 'date': -1 }).limit(limit);
    }

    const RequestDoTasks = await RequestDoTaskModel.find({ householdID, toUserID }).sort({ 'date': -1 }).limit(limit);

    return RequestDoTasks;
};

export const createRequestDoTask = async (householdID: string, fromUserID: string, toUserID: string, taskID: string, points: number, comments?: string): Promise<(RequestDoTask & IDocument)> => {
    const createdRequestDoTask = await RequestDoTaskModel.create({ householdID, fromUserID, toUserID, taskID, dateCompleted: Date.now(), points, comments });

    if (!createdRequestDoTask) {
        throw 'Unable to create RequestDoTask';
    }

    return createdRequestDoTask;
};
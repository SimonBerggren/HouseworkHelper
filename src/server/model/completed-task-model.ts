import mongoose, { Schema, Document as IDocument } from 'mongoose';

import { dropAllTables, dropCompletedTaskTable } from '../utils/dev-utils';

interface CompletedTaskSchemaModel extends CompletedTask, IDocument {
}

const CompletedTaskSchema = new Schema<CompletedTaskSchemaModel>({
    householdID: { type: String, required: true },
    taskID: { type: String, required: true },
    userID: { type: String, required: true },
    date: { type: Date, required: true }
});

const CompletedTaskModel = mongoose.model<CompletedTaskSchemaModel>('completed-task', CompletedTaskSchema);

if (dropAllTables || dropCompletedTaskTable) {
    CompletedTaskModel.collection.drop();
}

//////////////////////////////// OPERATIONS ////////////////////////////////

export const findCompletedTasks = async (householdID?: string, userID?: string): Promise<(CompletedTask & IDocument)[]> => {

    // dev
    if (!householdID) {
        return await CompletedTaskModel.find();
    }

    // adult
    if (!userID) {
        return await CompletedTaskModel.find({ householdID });
    }

    const completedTasks = await CompletedTaskModel.find({ householdID, userID });

    return completedTasks;
};

export const findLatestCompletedTasks = async (limit: number, householdID?: string, userID?: string): Promise<(CompletedTask & IDocument)[]> => {

    // dev
    if (!householdID) {
        return await CompletedTaskModel.find().sort({ 'date': -1 }).limit(limit);
    }

    // adult
    if (!userID) {
        return await CompletedTaskModel.find({ householdID }).sort({ 'date': -1 }).limit(limit);
    }

    const completedTasks = await CompletedTaskModel.find({ householdID, userID }).sort({ 'date': -1 }).limit(limit);

    return completedTasks;
};

export const createCompletedTask = async (householdID: string, userID: string, taskID: string): Promise<(CompletedTask & IDocument)> => {
    const createdCompletedTask = await CompletedTaskModel.create({ householdID, userID, taskID, date: Date.now() });

    if (!createdCompletedTask) {
        throw 'Unable to create completedTask';
    }

    return createdCompletedTask;
};
import mongoose, { Schema, Document as IDocument } from 'mongoose';

import { dropAllTables, dropTaskTable } from '../utils/dev-utils';

interface TaskSchemaModel extends Task, IDocument {
}

const TaskSchema = new Schema<TaskSchemaModel>({
    householdID: { type: String, required: true },
    frequency: { type: String, required: true },
    points: { type: Number, required: true },
    taskName: { type: String, required: true },
    desc: { type: String },
    visibleTo: { type: Array, required: true },
    visibleToEveryone: { type: Boolean, required: true }
});

TaskSchema.index({ householdID: 1, taskName: 1 }, { unique: true });

const TaskModel = mongoose.model<TaskSchemaModel>('task', TaskSchema);

if (dropAllTables || dropTaskTable) {
    TaskModel.collection.drop();
}

//////////////////////////////// OPERATIONS ////////////////////////////////

export const findTask = async (householdID: string, taskName: string): Promise<Task & IDocument> => {
    const task = await TaskModel.findOne({ householdID, taskName });

    if (!task) {
        throw 'Unable to find task';
    }

    return task;
};

export const findTasks = async (householdID?: string, userID?: string, includeVisibleToEveryOne: boolean = true): Promise<(Task & IDocument)[]> => {

    // dev
    if (!householdID) {
        return await TaskModel.find();
    }

    // adult
    if (!userID) {
        return await TaskModel.find({ householdID });
    }

    const publicTasks = await TaskModel.find({ householdID, visibleToEveryone: includeVisibleToEveryOne });
    const otherTasks = await TaskModel.find({ householdID, visibleToEveryone: false, visibleTo: { '$in': [userID] } });

    return publicTasks.concat(otherTasks);
};

export const createTask = async (householdID: string, taskToCreate: Task): Promise<(Task & IDocument)> => {
    const createdTask = await TaskModel.create({ householdID, ...taskToCreate });

    if (!createdTask) {
        throw 'Unable to create task';
    }

    return createdTask;
};

export const updateTask = async (householdID: string, taskName: string, taskToUpdate: Task): Promise<(Task & IDocument)> => {
    const task = await TaskModel.updateOne({ householdID, taskName }, { householdID, ...taskToUpdate });

    if (!task) {
        throw 'Unable to update task';
    }

    return task;
};

export const deleteTask = async (householdID: string, taskName: string): Promise<(Task & IDocument)> => {
    const deletedTask = await TaskModel.findOneAndDelete({ householdID, taskName });

    if (!deletedTask) {
        throw 'Unable to delete task';
    }

    return deletedTask;
};
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
    visibleToAll: { type: Boolean, required: true },
    visibleTo: { type: Array }
});

TaskSchema.index({ householdID: 1, taskName: 1 }, { unique: true });

const TaskModel = mongoose.model<TaskSchemaModel>('task', TaskSchema);

if (dropAllTables || dropTaskTable) {
    TaskModel.collection.drop();
}


export default TaskModel;
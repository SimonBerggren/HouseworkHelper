import mongoose, { Schema, Document as IDocument } from 'mongoose';

import { dropAllTables, dropCompletedTaskTable } from '../utils/dev-utils';

interface CompletedTaskSchemaModel extends Task, IDocument {
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

export default CompletedTaskModel;
import mongoose, { Schema, Document as IDocument } from 'mongoose';

interface CompletedTaskSchemaModel extends Task, IDocument {
}

const CompletedTaskSchema = new Schema<CompletedTaskSchemaModel>({
    householdID: { type: String, required: true },
    taskID: { type: String, required: true },
    userID: { type: String, required: true },
    date: { type: Date, required: true }
});

const CompletedTaskModel = mongoose.model<CompletedTaskSchemaModel>('completed-task', CompletedTaskSchema);

export default CompletedTaskModel;
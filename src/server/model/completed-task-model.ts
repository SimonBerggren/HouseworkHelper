import mongoose, { Schema, Document as IDocument } from 'mongoose';

interface CompletedTaskSchemaModel extends Task, IDocument {
}

const CompletedTaskSchema = new Schema<CompletedTaskSchemaModel>({
    points: { type: Number, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    userName: { type: String, required: true },
});

CompletedTaskSchema.index({ email: 1, name: 1 }, { unique: true });

const CompletedTaskModel = mongoose.model<CompletedTaskSchemaModel>('completed-task', CompletedTaskSchema);

export default CompletedTaskModel;
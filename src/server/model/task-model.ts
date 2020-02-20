import mongoose, { Schema, Document as IDocument } from 'mongoose';

interface TaskSchemaModel extends Task, IDocument {
}

const TaskSchema = new Schema<TaskSchemaModel>({
    points: { type: Number, required: true },
    email: { type: String, required: true },
    frequency: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
});

TaskSchema.index({ email: 1, name: 1 }, { unique: true });

const TaskModel = mongoose.model<TaskSchemaModel>('task', TaskSchema);

export default TaskModel;
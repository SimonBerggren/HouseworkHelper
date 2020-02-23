import mongoose, { Schema, Document as IDocument } from 'mongoose';

interface TaskSchemaModel extends Task, IDocument {
}

const TaskSchema = new Schema<TaskSchemaModel>({
    frequency: { type: String, required: true },
    householdID: { type: String, required: true },
    points: { type: Number, required: true },
    title: { type: String, required: true },
    desc: { type: String },
});

TaskSchema.index({ householdID: 1, title: 1 }, { unique: true });

const TaskModel = mongoose.model<TaskSchemaModel>('task', TaskSchema);

TaskModel.collection.drop();

export default TaskModel;
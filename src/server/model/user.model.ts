import mongoose, { Schema, Document as IDocument } from 'mongoose';

interface UserSchemaModel extends User, IDocument {
}

const UserSchema = new Schema<UserSchemaModel>({
    householdID: { type: String, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true, default: 0 }
});

UserSchema.index({ householdID: 1, name: 1 }, { unique: true });

const UserModel = mongoose.model<UserSchemaModel>('user', UserSchema);

export default UserModel;
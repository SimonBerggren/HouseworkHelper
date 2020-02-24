import mongoose, { Schema, Document as IDocument } from 'mongoose';

import { dropAllTables, dropUserTable } from '../utils/dev-utils';

interface UserSchemaModel extends User, IDocument {
}

const UserSchema = new Schema<UserSchemaModel>({
    householdID: { type: String, required: true },
    userName: { type: String, required: true },
    points: { type: Number, required: true, default: 0 }
});

UserSchema.index({ householdID: 1, userName: 1 }, { unique: true });

const UserModel = mongoose.model<UserSchemaModel>('user', UserSchema);

if (dropAllTables || dropUserTable) {
    UserModel.collection.drop();
}

export default UserModel;
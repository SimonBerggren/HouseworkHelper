import mongoose, { Schema, Document as IDocument } from 'mongoose';
import bcrypt from 'bcrypt';

import { dropAllTables, dropUserTable } from '../utils/dev-utils';

interface UserSchemaModel extends User, IDocument {
}

const UserSchema = new Schema<UserSchemaModel>({
    householdID: { type: String, required: true },
    userName: { type: String, required: true },
    isKid: { type: Boolean, required: true },
    profilePicture: { type: Number, required: true },
    password: { type: String, required: false },
    points: { type: Number, required: true, default: 0 }
});

UserSchema.index({ householdID: 1, userName: 1 }, { unique: true });

// Hash the password before saving the user
UserSchema.pre<UserSchemaModel>('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const UserModel = mongoose.model<UserSchemaModel>('user', UserSchema);

if (dropAllTables || dropUserTable) {
    UserModel.collection.drop();
}

export default UserModel;
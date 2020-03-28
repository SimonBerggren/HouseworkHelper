import mongoose, { Schema, Document as IDocument } from 'mongoose';
import bcrypt from 'bcrypt';

import { dropAllTables, dropUserTable } from '../utils/dev-utils';
import { findTasks, deleteTask } from './task-model';

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
    if (user.isModified('password') && user.password) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const UserModel = mongoose.model<UserSchemaModel>('user', UserSchema);

if (dropAllTables || dropUserTable) {
    UserModel.collection.drop();
}

//////////////////////////////// OPERATIONS ////////////////////////////////

export const findUser = async (householdID: string, userName: string): Promise<User & IDocument> => {
    const user = await UserModel.findOne({ householdID, userName });

    if (!user) {
        throw 'Unable to find user';
    }

    return user;
};

export const findUserByID = async (id: string): Promise<User & IDocument> => {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
        throw 'Unable to find user';
    }

    return user;
};

export const findUsers = async (householdID?: string): Promise<User[]> => {

    // dev
    if (!householdID) {
        return await UserModel.find();
    }

    const users = await UserModel.find({ householdID });

    return users;
};

export const createUser = async (householdID: string, user: User): Promise<User> => {
    const createdUser = await UserModel.create({ householdID, ...user });

    if (!createdUser) {
        throw 'Unable to create user';
    }

    return createdUser;
};

export const deleteUser = async (householdID: string, userName: string): Promise<User> => {
    const deletedUser = await UserModel.findOneAndDelete({ householdID, userName });

    if (!deletedUser) {
        throw 'Unable to delete user';
    }

    const tasks = await findTasks(householdID, deletedUser.id, false);

    await Promise.all(tasks.map(async task => {
        task.visibleTo = task.visibleTo.filter(userID => userID !== deletedUser.id);

        if (!task.visibleTo.length) {
            const deletedTask = await deleteTask(householdID, task.taskName);

            if (!deletedTask) {
                throw 'Something went wrong while deleting private task';
            }

        } else {
            task.save();
        }

        return task;
    }));

    return deletedUser;
};
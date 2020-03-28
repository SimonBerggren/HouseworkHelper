import mongoose, { Schema, Document as IDocument } from 'mongoose';

import { validateUser } from '../../common/validation/validate-user';
import { dropAllTables, dropUserTable } from '../utils/dev-utils';
import { findTasks, deleteTask } from './task-model';
import { encrypt } from '../utils/encryption';

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

const UserModel = mongoose.model<UserSchemaModel>('user', UserSchema);

if (dropAllTables || dropUserTable) {
    UserModel.collection.drop();
}

//////////////////////////////// OPERATIONS ////////////////////////////////

export const userExist = async (householdID: string, userName: string): Promise<boolean> => {
    try {
        await findUser(householdID, userName);
        return true;
    } catch{
        return false;
    }
};

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

    validateUser(user);

    if (user.password) {
        user.password = await encrypt(user.password);
    }

    const createdUser = await UserModel.create({ householdID, ...user });

    if (!createdUser) {
        throw 'Unable to create user';
    }

    return createdUser;
};
export const updateUser = async (householdID: string, userName: string, user: User): Promise<User> => {

    validateUser(user);

    if (user.password) {
        user.password = await encrypt(user.password);
    }

    const updatedUser = await UserModel.updateOne({ householdID, userName }, { householdID, ...user });

    if (!updatedUser) {
        throw 'Unable to update user';
    }

    return updatedUser;
};

export const deleteUser = async (householdID: string, userName: string): Promise<User> => {
    const deletedUser = await UserModel.findOneAndDelete({ householdID, userName });

    if (!deletedUser) {
        throw 'Unable to delete user';
    }

    // remove user from visibleTo 
    // if any task's visibleTo is empty afterwards, delete it
    const privateTasks = (await findTasks(householdID, deletedUser.id)).filter(task => !task.visibleToEveryone);

    await Promise.all(privateTasks.map(async task => {
        task.visibleTo = task.visibleTo.filter(userID => userID !== deletedUser.id);

        if (!task.visibleTo.length) {
            return deleteTask(householdID, task.taskName);
        } else {
            task.save();
        }

        return task;
    }));

    return deletedUser;
};
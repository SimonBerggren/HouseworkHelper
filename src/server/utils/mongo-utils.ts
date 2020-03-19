import { Document as IDocument } from 'mongoose';

import HouseholdModel from '../model/household-model';
import UserModel from '../model/user-model';
import TaskModel from '../model/task-model';

export const getHousehold = (request: Express.Request) => (request.user as Household & IDocument);

export const getHouseholdID = (request: Express.Request): string => getHousehold(request).id;

export const findHousehold = async (conditions: any) => {
    const household = await HouseholdModel.findOne(conditions);

    if (!household) {
        return Promise.reject('Could not find household');
    }

    return Promise.resolve(household);
};

export const findUser = async (conditions?: any): Promise<User> => {
    const dirtyUser = await UserModel.findOne(conditions);

    if (!dirtyUser) {
        console.log('Could not find user using conditions', conditions);
        return Promise.reject('Could not find user');
    }

    const cleanUser: User = {
        profilePicture: dirtyUser.profilePicture,
        isKid: dirtyUser.isKid,
        points: dirtyUser.points,
        userName: dirtyUser.userName,
        password: dirtyUser.password ? '********' : undefined
    };

    return Promise.resolve(cleanUser);
};

export const findUsers = async (conditions?: any): Promise<User[]> => {
    const dirtyUsers = await UserModel.find(conditions);

    if (!dirtyUsers) {
        return Promise.reject('Could not find any users');
    }

    const cleanUsers: User[] = dirtyUsers.map(user => {
        return {
            profilePicture: user.profilePicture,
            isKid: user.isKid,
            points: user.points,
            userName: user.userName,
            password: user.password ? '********' : undefined
        };
    });

    return Promise.resolve(cleanUsers);
};

export const findTask = async (conditions: any): Promise<Task & IDocument> => {
    const task = await TaskModel.findOne(conditions);

    if (!task) {
        return Promise.reject('Could not find task');
    }

    return Promise.resolve(task);
};

export const findTasks = async (conditions: any): Promise<(Task & IDocument)[]> => {
    const tasks = await TaskModel.find(conditions);

    if (!tasks) {
        return Promise.reject('Could not find any tasks');
    }

    return Promise.resolve(tasks);
};
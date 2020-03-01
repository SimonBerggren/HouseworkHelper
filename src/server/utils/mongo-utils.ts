import HouseholdModel from '../model/household-model';
import UserModel from '../model/user.model';
import TaskModel from '../model/task-model';
import { Document as IDocument } from 'mongoose';

export const getHousehold = (request: Express.Request) => (request.user as Household & IDocument);

export const getHouseholdID = (request: Express.Request): string => getHousehold(request).id;

export const findHousehold = async (conditions: any) => {
    const household = await HouseholdModel.findOne(conditions);

    if (!household) {
        return Promise.reject('Could not find household');
    }

    return Promise.resolve(household);
};

export const findUser = async (conditions: any): Promise<User & IDocument> => {
    const user = await UserModel.findOne(conditions);

    if (!user) {
        console.log('Could not find user using conditions', conditions);
        return Promise.reject('Could not find user');
    }

    return Promise.resolve(user);
};

export const findUsers = async (conditions: any): Promise<User[] & IDocument[]> => {
    const users = await UserModel.find(conditions);

    if (!users) {
        return Promise.reject('Could not find any users');
    }

    return Promise.resolve(users);
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
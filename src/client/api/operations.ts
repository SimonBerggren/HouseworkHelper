import { get, post, remove } from './api';
import { deauthenticate, resetUser } from '../app/authentication';

// Authentication

export const signup = (household: Household): Promise<boolean> =>
    post('signup', household);

export const login = (email: string, password: string): Promise<string> =>
    post('login', { email, password });

export const logout = () =>
    deauthenticate();

export const switchUser = () =>
    resetUser();

// Household

export const getHousehold = (): Promise<Household> =>
    get('household');

// Users

export const getUsers = (): Promise<User[]> =>
    get('user');

export const createUser = (data: CreateUserRequest): Promise<User> =>
    post('user', data);

export const deleteUser = (data: DeleteUserRequest): Promise<User> =>
    remove('user', data);

// Tasks

export const getTasks = (): Promise<Task[]> =>
    get('task');


export const createTask = (task: Task): Promise<Task> =>
    post('task', task);

export const deleteTask = (taskName: string): Promise<Task> =>
    remove('task', taskName);

export const completeTask = (completedTask: CompleteTaskRequest): Promise<boolean> =>
    post('completed-task', completedTask);

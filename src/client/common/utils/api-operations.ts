import { unsetToken, getToken } from '../user/authentication';
import { unsetUser } from '../user/user-info';

const request = (path: string, method: string, data?: any) =>
    fetch(
        `api/${path}`,
        {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': getToken()
            }
        }
    )
        .then(async response => {

            const json = await response.json();
            if (response.ok) {
                return Promise.resolve(json);
            }
            else {
                return Promise.reject(json);
            }
        })
        .catch(error => {
            return Promise.reject(error);
        });

export const get = (path: string) => request(path, 'GET');

export const post = (path: string, data: any) => request(path, 'POST', data);

export const put = (path: string, data: any) => request(path, 'PUT', data);

export const remove = (path: string, data: any) => request(path, 'DELETE', data);

// Authentication

export const signup = (household: Household): Promise<boolean> =>
    post('signup', household);

export const login = (email: string, password: string): Promise<string> =>
    post('login', { email, password });

export const loginUser = (userName: string, password: string): Promise<string> =>
    post('login/user', { userName, password });

export const logout = () =>
    unsetToken();

export const switchUser = () =>
    unsetUser();

// Household

export const getHousehold = (): Promise<Household> =>
    get('household');

// Users

export const getUsers = (): Promise<User[]> =>
    get('user');

export const createUser = (data: CreateUserRequest): Promise<User> =>
    post('user', data);

export const editUser = (data: UpdateUserRequest): Promise<string> =>
    put('user', data);

export const deleteUser = (data: DeleteUserRequest): Promise<User> =>
    remove('user', data);

// Tasks

export const getTasks = (): Promise<Task[]> =>
    get('task');

export const getAllTasks = (): Promise<Task[]> =>
    get('task/all');

export const createTask = (task: Task): Promise<Task> =>
    post('task', task);

export const editTask = (data: UpdateTaskRequest): Promise<Task> =>
    put('task', data);

export const deleteTask = (data: DeleteTaskRequest): Promise<Task> =>
    remove('task', data);

export const getCompletedTasks = (): Promise<CompletedTask[]> =>
    get('completed-task');

export const completeTask = (data: CompleteTaskRequest): Promise<boolean> =>
    post('completed-task', data);

// Rewards

export const getRewards = (): Promise<Reward[]> =>
    get('reward');

export const getAllRewards = (): Promise<Reward[]> =>
    get('reward/all');

export const createReward = (task: Reward): Promise<Reward> =>
    post('reward', task);

export const editReward = (data: UpdateRewardRequest): Promise<Reward> =>
    put('reward', data);

export const deleteReward = (data: DeleteRewardRequest): Promise<Reward> =>
    remove('reward', data);

export const getRedeemedRewards = (): Promise<CompletedTask[]> =>
    get('redeemed-reward');

export const redeemReward = (data: RedeemRewardRequest): Promise<boolean> =>
    post('redeemed-reward', data);
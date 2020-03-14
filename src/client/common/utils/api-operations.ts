import { deauthenticate, getToken } from '../user/authentication';
import { unsetUser, getUserName } from '../user/user-info';

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
            console.log(error);
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

export const logout = () =>
    deauthenticate();

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

export const updateUser = (data: UpdateUserRequest): Promise<string> =>
    put('user', data);

export const deleteUser = (data: DeleteUserRequest): Promise<User> =>
    remove('user', data);

// Tasks

export const getTasks = (): Promise<Task[]> =>
    get('task/' + getUserName());

export const createTask = (task: Task): Promise<Task> =>
    post('task', task);

export const updateTask = (data: UpdateTaskRequest): Promise<Task> =>
    put('task', data);

export const deleteTask = (data: DeleteTaskRequest): Promise<Task> =>
    remove('task', data);

export const getCompletedTasks = (): Promise<CompletedTask[]> =>
    get('completed-task');

export const completeTask = (data: CompleteTaskRequest): Promise<boolean> =>
    post('completed-task', data);
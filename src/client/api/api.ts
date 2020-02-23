import { getToken } from '../app/authentication';

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
        .catch(() => {
            alert('Something went wrong');
            return Promise.reject();
        });

export const get = (path: string) => request(path, 'GET');

export const post = (path: string, data: any) => request(path, 'POST', data);

export const remove = (path: string, data: any) => request(path, 'DELETE', data);

// actions
export const signup = (household: Household) =>
    post('signup', household);

export const login = (email: string, password: string) =>
    post('login', { email, password });
const tokenKey = 'hwhJwtToken';
const userKey = 'hwhUser';

const storage = sessionStorage;

// User authentication

export const authenticate = (token: string) =>
    storage.setItem(tokenKey, `bearer ${token}`);

export const deauthenticate = () => {
    storage.removeItem(tokenKey);
    storage.removeItem(userKey);
};

export const isAuthenticated = (): boolean =>
    storage.getItem(tokenKey) !== null;

export const getToken = (): string =>
    storage.getItem(tokenKey) || '';

// User configuration

export const setUser = (userName: string) =>
    storage.setItem(userKey, userName);

export const resetUser = () =>
    storage.removeItem(userKey);

export const isFullyConfigured = (): boolean =>
    isAuthenticated() && getUserName() !== '';

export const getUserName = (): string =>
    storage.getItem(userKey) || '';
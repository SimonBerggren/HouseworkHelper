import { populateHouseholdInfo, emptyHouseholdInfo } from './household-info';

const tokenKey = 'hwhJwtToken';
const userKey = 'hwhUser';

const storage = sessionStorage;

// User authentication

export const authenticate = (token: string) => {
    storage.setItem(tokenKey, `bearer ${token}`);
    populateHouseholdInfo();
};

export const deauthenticate = () => {
    storage.removeItem(tokenKey);
    storage.removeItem(userKey);
    emptyHouseholdInfo();
};

export const isAuthenticated = (): boolean =>
    storage.getItem(tokenKey) !== null;

export const getToken = (): string =>
    storage.getItem(tokenKey) || '';

export const setUser = (userName: string) =>
    storage.setItem(userKey, userName);

export const unsetUser = () =>
    storage.removeItem(userKey);

export const isFullyConfigured = (): boolean =>
    isAuthenticated() && getUserName() !== '';

export const getUserName = (): string =>
    storage.getItem(userKey) || '';
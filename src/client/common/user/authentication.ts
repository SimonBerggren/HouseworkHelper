import { emitEvent } from '../../app/event-manager';

const tokenKey = 'hwhJwtToken';
const userKey = 'hwhUser';

const storage = sessionStorage;

// User authentication

export const authenticate = (token: string) => {
    storage.setItem(tokenKey, `bearer ${token}`);
    emitEvent('authenticateChanged', true);
};

export const deauthenticate = () => {
    storage.removeItem(tokenKey);
    storage.removeItem(userKey);
    
    emitEvent('authenticateChanged', false);
    emitEvent('userNameChanged', '');
};

export const isAuthenticated = (): boolean =>
    storage.getItem(tokenKey) !== null;

export const getToken = (): string =>
    storage.getItem(tokenKey) || '';

export const setUser = (userName: string) => {
    storage.setItem(userKey, userName);
    emitEvent('userNameChanged', userName);
};

export const unsetUser = () => {
    storage.removeItem(userKey);
    emitEvent('userNameChanged', '');
};

export const isFullyConfigured = (): boolean =>
    isAuthenticated() && getUserName() !== '';

export const getUserName = (): string =>
    storage.getItem(userKey) || '';
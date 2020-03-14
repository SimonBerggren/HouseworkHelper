import { emitEvent } from '../../app/event-manager';
import { unsetUser, getUserName } from './user-info';

const tokenKey = 'hwhJwtToken';

export const storage = sessionStorage;

// User authentication

export const authenticate = (token: string) => {
    storage.setItem(tokenKey, `bearer ${token}`);
    emitEvent('authenticateChanged', true);
};

export const deauthenticate = () => {
    storage.removeItem(tokenKey);
    unsetUser();

    emitEvent('authenticateChanged', false);
};

export const isAuthenticated = (): boolean =>
    storage.getItem(tokenKey) !== null;

export const getToken = (): string =>
    storage.getItem(tokenKey) || '';

export const isFullyConfigured = (): boolean =>
    isAuthenticated() && getUserName() !== '';

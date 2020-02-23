const tokenKey = 'hwhJwtToken';
const userKey = 'hwhUser';
const emailKey = 'hwhEmail';

const storage = sessionStorage;

// User authentication
export const deauthenticate = () => {
    storage.removeItem(tokenKey);
    storage.removeItem(userKey);
};

export const authenticate = (token: string, email: string) => {
    storage.setItem(tokenKey, `bearer ${token}`);
    storage.setItem(emailKey, email);
};

export const getToken = (): string =>
    storage.getItem(tokenKey) || '';

export const isLoggedIn = (): boolean =>
    storage.getItem(tokenKey) !== null;


// User configuration
export const setUser = (name: string) =>
    storage.setItem(userKey, name);

export const getUserName = (): string =>
    storage.getItem(userKey) || '';

export const getEmail = (): string =>
    storage.getItem(emailKey) || '';

export const isAuthenticated = (): boolean =>
    isLoggedIn() && getUserName() !== '' && getEmail() !== '';
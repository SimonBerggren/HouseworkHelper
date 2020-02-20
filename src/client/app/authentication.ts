const tokenKey = 'hwhJwtToken';
const userKey = 'hwhUser';
const emailKey = 'hwhEmail';

// User authentication
export const deauthenticate = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
};

export const authenticate = (token: string, email: string) => {
    localStorage.setItem(tokenKey, `bearer ${token}`);
    localStorage.setItem(emailKey, email);
};

export const getToken = (): string =>
    localStorage.getItem(tokenKey) || '';

export const isLoggedIn = (): boolean =>
    localStorage.getItem(tokenKey) !== null;


// User configuration
export const setUser = (name: string) =>
    localStorage.setItem(userKey, name);

export const getUserName = (): string =>
    localStorage.getItem(userKey) || '';

export const getEmail = (): string =>
    localStorage.getItem(emailKey) || '';

export const isAuthenticated = (): boolean =>
    isLoggedIn() && getUserName() !== '' && getEmail() !== '';
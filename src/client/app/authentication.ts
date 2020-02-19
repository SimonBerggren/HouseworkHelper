const tokenKey = 'jwtToken';

export const deauthenticate = () => sessionStorage.removeItem(tokenKey);

export const authenticate = (token: string) =>
    sessionStorage.setItem(tokenKey, `bearer ${token}`);

export const getToken = (): string =>
    sessionStorage.getItem(tokenKey) || '';

export const isAuthenticated = (): boolean =>
    sessionStorage.getItem(tokenKey) !== null;
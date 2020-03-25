import React, { useState } from 'react';

import { isAuthenticated } from '../common/user/authentication';
import { addEventListener } from './event-manager';
import { getUser } from '../common/user/user-info';

interface IUserContext {
    user: User;
    authenticated: boolean;
}

const defaultUserContext: IUserContext = {
    user: getUser() as User,
    authenticated: isAuthenticated()
};

export const UserContext = React.createContext<IUserContext>(defaultUserContext);

const UserContextProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {

    const [user, setUser] = useState(defaultUserContext.user);
    const [authenticated, setAuthenticated] = useState(defaultUserContext.authenticated);

    addEventListener('userChanged', user => setUser(user));
    addEventListener('authenticateChanged', authenticated => setAuthenticated(authenticated));

    return (
        <UserContext.Provider value={{ user, authenticated }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
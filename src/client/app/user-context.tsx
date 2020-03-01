import React, { useState } from 'react';

import { isAuthenticated, getUserName } from '../common/user/authentication';
import { addEventListener } from './event-manager';

interface IUserContext {
    userName: string;
    authenticated: boolean;
}

const defaultUserContext: IUserContext = {
    userName: getUserName(),
    authenticated: isAuthenticated()
};

export const UserContext = React.createContext<IUserContext>(defaultUserContext);

const UserContextProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {

    const [authenticated, setAuthenticated] = useState(defaultUserContext.authenticated);
    const [userName, setUserName] = useState(defaultUserContext.userName);

    addEventListener('userNameChanged', userName => setUserName(userName));
    addEventListener('authenticateChanged', authenticated => setAuthenticated(authenticated));

    return (
        <UserContext.Provider value={{ authenticated, userName }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
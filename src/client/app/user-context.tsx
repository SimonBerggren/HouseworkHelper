import React, { useState } from 'react';

import { isAuthenticated, getUserName } from '../common/user/authentication';
import { addEventListener } from './event-manager';

interface IUserContext {
    userName: string;
    authenticated: boolean;
}

const defaultUserContext: IUserContext = {
    userName: '',
    authenticated: false
}

export const UserContext = React.createContext<IUserContext>(defaultUserContext);

interface UserContextProviderProps { }

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {

    const [context, setContext] = useState<IUserContext>({
        authenticated: isAuthenticated(),
        userName: getUserName()
    });

    addEventListener('userNameChanged', userName => setContext({ ...context, userName }));
    addEventListener('authenticateChanged', authenticated => setContext({ ...context, authenticated }));

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
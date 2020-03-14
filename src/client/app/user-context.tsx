import React, { useState } from 'react';

import { getUserPoints, getUserName } from '../common/user/user-info';
import { isAuthenticated } from '../common/user/authentication';
import { addEventListener } from './event-manager';

interface IUserContext {
    userName: string;
    userPoints: number;
    authenticated: boolean;
}

const defaultUserContext: IUserContext = {
    userName: getUserName(),
    userPoints: getUserPoints(),
    authenticated: isAuthenticated()
};

export const UserContext = React.createContext<IUserContext>(defaultUserContext);

const UserContextProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {

    const [userName, setUserName] = useState(defaultUserContext.userName);
    const [userPoints, setUserPoints] = useState(defaultUserContext.userPoints);
    const [authenticated, setAuthenticated] = useState(defaultUserContext.authenticated);

    addEventListener('userNameChanged', userName => setUserName(userName));
    addEventListener('userPointsChanged', userPoints => setUserPoints(userPoints));
    addEventListener('authenticateChanged', authenticated => setAuthenticated(authenticated));

    return (
        <UserContext.Provider value={{ authenticated, userName, userPoints }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
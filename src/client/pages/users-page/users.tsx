import styled from 'styled-components';
import React from 'react';

import { emitEvent } from '../../app/event-manager';

import User from './user';

interface UsersProps {
    edit: boolean;
    users: User[];
    onUserDeleted: (deletedUser: User) => void;
}

const Users: React.FC<UsersProps> = ({ edit, users, onUserDeleted }) => {

    const onSelectUser = ({ userName }: User) => {
        emitEvent('userNameChanged', userName);
    }

    return (
        <UsersContainer>
            {users.map((user, key) =>
                <User
                    edit={edit}
                    key={key}
                    user={user}
                    onClick={() => onSelectUser(user)}
                    onUserDeleted={() => onUserDeleted(user)}
                />
            )}
        </UsersContainer>
    )
}

const UsersContainer = styled.div`
    width: 50em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export default Users;
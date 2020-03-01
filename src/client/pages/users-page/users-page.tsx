import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import PageWrapper from '../../common/page-wrapper';
import CreateUser from './create-user';
import User from './user';

import { getUsers } from '../../common/api-operations';
import { flexCenter, fadeIn } from '../../style/mixins';

const UsersPage = () => {

    const [editing, setEditing] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(users => setUsers(users));
    }, []);

    const onCreateUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.blur();
        setCreatingUser(true);
    };

    const onUserCreated = (createdUser: User) => {
        const concatendatedUsers = users.concat(createdUser);
        setUsers(concatendatedUsers);
        setCreatingUser(false);
    };

    const onUserDeleted = ({ userName }: User) => {

        const copy = [...users];
        const index = copy.findIndex(user => user.userName === userName);
        copy.splice(index, 1);
        setUsers(copy);
    };

    return (
        <PageWrapper>

            <UsersContainer>

                {editing &&
                    <AddUserButton
                        onClick={onCreateUser}
                    >
                        <AddIcon />
                    </AddUserButton>
                }

                {users.map((user) =>
                    <User
                        edit={editing}
                        key={user.userName}
                        user={user}
                        onUserDeleted={onUserDeleted}
                    />
                )}

            </UsersContainer>

            <CreateUser
                open={creatingUser}
                onClose={() => setCreatingUser(false)}
                onUserCreated={onUserCreated}
            />

            <ManageUsersButton
                size='large'
                color='primary'
                variant='outlined'
                onClick={() => setEditing(!editing)}
            >
                {editing ? 'Done' : 'Manage Users'}
            </ManageUsersButton>

        </PageWrapper>
    );
};

const UsersContainer = styled.div`
    position: relative;

    ${flexCenter}
    flex-wrap: wrap;
    flex-direction: row;

    background: rgba(255,255,255,0.9);
    border: 1px solid #9c27b0;

    padding: 2em;
    margin-bottom: 5em;

    width: 50em;
`;

const ManageUsersButton = styled(Button)`
    width: 20em;
    height: 4em;
`;

const AddUserButton = styled(IconButton)`
    && {
        ${fadeIn(0.2)}
        position: absolute;
        color: #9c27b0;
        top: 0;
        left: 0;
    }
`;

export default UsersPage;
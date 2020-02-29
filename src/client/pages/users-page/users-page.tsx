import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import PageWrapper from '../../common/page-wrapper';

import Users from './users';

import { getUsers, deleteUser } from '../../common/api-operations';
import { Button, IconButton } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import CreateUser from './create-user';

const UsersPage = () => {

    const [editing, setEditing] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(users => setUsers(users));
    }, []);

    const onUserCreated = (createdUser: User) => {
        const concatendatedUsers = users.concat(createdUser);
        setUsers(concatendatedUsers);
        setCreatingUser(false);
    };

    const onUserDeleted = ({ userName }: User) => {
        const filteredUsers = users.filter(user => user.userName !== userName);
        setUsers(filteredUsers);
    };

    return (
        <PageWrapper>

            <UsersContainer>

                {editing &&
                    <AddUserButton
                        onClick={() => setCreatingUser(true)}
                    >
                        <AddIcon />
                    </AddUserButton>
                }

                <Users
                    edit={editing}
                    onUserDeleted={onUserDeleted}
                    users={users}
                />

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
}

const UsersContainer = styled.div`
    background: rgba(255,255,255,0.9);
    padding: 2em;
    margin-bottom: 5em;
    border: 1px solid #9c27b0;
`;

const ManageUsersButton = styled(Button)`
    width: 20em;
    height: 4em;
`;

const AddUserButton = styled(IconButton)`
    && {
        position: absolute;
        color: #9c27b0;
    }
`;

export default UsersPage;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import IconButtonTop from '../../common/components/icon-button-top';
import PageWrapper from '../../common/utils/page-wrapper';
import Button from '../../common/components/button';
import Link from '../../common/components/link';
import CreateUser from './create-user';
import User from './user';

import { getUsers } from '../../common/utils/api-operations';
import { setUserName, setUserPoints } from '../../common/user/user-info';
import { flexCenter } from '../../style/mixins';
import IconButton from '../../common/components/icon-button';

const UsersPage = () => {

    const [selectedUser, setSelectedUser] = useState<User>();
    const [creatingUser, setCreatingUser] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        getUsers().then(users => {
            if (!users.length) {
                setEditing(true);
            } else {
                setUsers(users);
            }
        });
    }, []);

    useEffect(() => {
        if (editing) {
            setSelectedUser(undefined);
        }
    }, [editing]);

    const onCreateUserClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.blur(); // if the user exits modal by pressing exit or enter
        setCreatingUser(true);
    };

    const onUserCreated = (createdUser: User) => {
        const concatendatedUsers = users.concat(createdUser);
        setUsers(concatendatedUsers);
        setCreatingUser(false);
    };

    const onUserSelected = () => {
        if (selectedUser) {
            setUserPoints(selectedUser.points);
            setUserName(selectedUser.userName);
        }
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
                    <IconButtonTop left
                        iconSize='large'
                        color='primary'
                        icon='add'
                        onClick={onCreateUserClicked}
                    />
                }

                {users.map((user) =>
                    <User
                        selected={selectedUser && selectedUser.userName === user.userName}
                        user={user}
                        edit={editing}
                        key={user.userName}
                        onUserSelected={setSelectedUser}
                        onUserDeleted={onUserDeleted}
                    />
                )}

                {selectedUser &&
                    <ForwardArrow to='/household' onClick={onUserSelected} >
                        <IconButton
                            color='primary'
                            icon='forward'
                            iconSize='large'
                        />
                    </ForwardArrow >
                }

            </UsersContainer>

            <CreateUser
                open={creatingUser}
                onUserCreated={onUserCreated}
                onClose={() => setCreatingUser(false)}
            />

            <Button
                onClick={() => setEditing(!editing)}
                label={editing ? 'Done' : 'Manage Users'}
            />

        </PageWrapper>
    );
};

const UsersContainer = styled.div`
    ${flexCenter}
    flex-wrap: wrap;
    flex-direction: row;

    position: relative;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 8px;

    padding: 50px;
`;

const ForwardArrow = styled(Link)`
    position: absolute;
    right: 0;
`;

export default UsersPage;
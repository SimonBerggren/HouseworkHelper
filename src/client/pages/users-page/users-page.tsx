import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ConfirmDialog from '../../common/components/dialog/confirm-dialog';
import IconButtonTop from '../../common/components/icon-button-top';
import Button from '../../common/components/button';
import EditUserDialog from './edit-user-dialog';
import User from './user';

import { getUsers, deleteUser } from '../../common/utils/api-operations';
import { CenterPageWrapper } from '../../common/utils/page-wrapper';
import { flexCenter } from '../../style/mixins';
import { Redirect } from 'react-router-dom';

const UsersPage = () => {

    const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false);
    const [showUserDialog, setShowUserDialog] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [userToDelete, setUserToDelete] = useState<User>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [userToEdit, setUserToEdit] = useState<User>();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(users => {
            if (!users.length) {
                setEditMode(true);
            } else {
                setUsers(users);
            }
        });
    }, []);

    const onCreateUser = () => {
        setUserToEdit(userToEdit);
        setShowUserDialog(true);
    };

    const onEditUser = (userToEdit: User) => {
        setUserToEdit(userToEdit);
        setShowUserDialog(true);
    };

    const onDeleteUser = (user: User) => {
        setUserToDelete(user);
        setIsConfirmingDelete(true);
    };

    const onUserCreated = (createdUser: User) => {
        const concatendatedUsers = users.concat(createdUser);
        setUsers(concatendatedUsers);
        onDialogClose();
    };

    const onUserEdited = async (editedUserName: string, newUser: User) => {
        const copy = [...users];
        const existingUserIndex = copy.findIndex(user => user.userName === editedUserName);
        copy.splice(existingUserIndex, 1, newUser);
        setUsers(copy);
        onDialogClose();
    };

    const onEditModeToggle = () => {
        setEditMode(!editMode);
        setSelectedUser(undefined);
    };

    const onUserSelected = (selectedUser: User) => {
        setSelectedUser(selectedUser);
    };

    const onDialogClose = () => {
        setUserToEdit(undefined);
        setShowUserDialog(false);
        setUserToDelete(undefined);
        setIsConfirmingDelete(false);
    };

    const onDeleteUserConfirmed = async () => {
        try {
            if (userToDelete) {
                const deletedUser = await deleteUser({ userName: userToDelete.userName });

                if (deletedUser) {
                    const copy = [...users];
                    const index = copy.findIndex(user => user.userName === userToDelete.userName);
                    copy.splice(index, 1);
                    setUsers(copy);

                    onDialogClose();
                }
            }
        } catch (error) {
            alert(error);
        }
    };

    return (selectedUser ? <Redirect to='/user' /> :
        <CenterPageWrapper>
            <Background>
                <UsersContainer>

                    <IconButtonTop left
                        color='primary'
                        icon='addUser'
                        onClick={onCreateUser}
                    />

                    {users.map((user) =>
                        <User
                            user={user}
                            editMode={editMode}
                            key={user.userName}
                            onUserSelected={onUserSelected}
                            onDeleteUser={onDeleteUser}
                            onEditUser={onEditUser}
                        />
                    )}

                </UsersContainer>

                <Button
                    onClick={onEditModeToggle}
                    label={editMode ? 'Done' : 'Manage Users'}
                />

            </Background>

            <EditUserDialog
                open={showUserDialog}
                userToEdit={userToEdit}
                onUserEdited={onUserEdited}
                onUserCreated={onUserCreated}
                onClose={onDialogClose}
            />

            <ConfirmDialog
                open={isConfirmingDelete}
                onClose={onDialogClose}
                onConfirm={onDeleteUserConfirmed}
            >
                {`Are you sure you want to delete ${userToDelete?.userName}?`}
            </ConfirmDialog>

        </CenterPageWrapper>
    );
};

const Background = styled.div`
    ${flexCenter}
    flex-direction: column;

    position: relative;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 8px;

    padding: 25px;
    margin: 20px;
`;

const UsersContainer = styled.div`
    ${flexCenter}
    flex-wrap: wrap;
    flex-direction: row;

    justify-content: center;

    padding: 50px 0px;
`;

export default UsersPage;
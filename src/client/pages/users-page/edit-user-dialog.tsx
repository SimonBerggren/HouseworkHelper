import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import EditableProfilePicture from '../../common/components/editable-profile-picture';
import PasswordInput from '../../common/components/input/password-input';
import TextInput from '../../common/components/input/text-input';
import Dialog from '../../common/components/dialog/dialog';
import Button from '../../common/components/button';

import { DialogActions, DialogContent, FormControlLabel, Switch } from '@material-ui/core';
import { editUser, createUser } from '../../common/utils/api-operations';
import { flexCenter } from '../../style/mixins';

type EditUserDialogProps = {
    onUserEdited: (editedUserName: string, newUser: User) => void;
    onUserCreated: (createdUser: User) => void;
    onClose: () => void;
    userToEdit?: User;
    open: boolean;
}

const defaultValues = (defaultUser?: User): User => {
    return {
        userName: defaultUser ? defaultUser.userName : '',
        points: defaultUser ? defaultUser.points : 0,
        profilePicture: defaultUser ? defaultUser.profilePicture : 0,
        password: defaultUser ? defaultUser.password : '',
        isKid: defaultUser ? defaultUser.isKid : false,
    };
};

const EditUserDialog: React.FC<EditUserDialogProps> = ({ open, onClose, userToEdit, onUserCreated, onUserEdited }: EditUserDialogProps) => {

    const [user, setUser] = useState<User>(defaultValues(userToEdit));

    useEffect(() => {
        if (open) {
            setUser(defaultValues(userToEdit));
        }
    }, [open, userToEdit]);

    const onCreateUser = async () => {
        try {
            const createdUser = await createUser({ user });

            if (createdUser) {
                onUserCreated(user);
            }
        } catch (error) {
            alert(error);
        }
    };

    const onEditUser = async () => {
        try {
            if (userToEdit) {

                const editedUser = await editUser({ userToUpdate: userToEdit.userName, user });

                if (editedUser) {
                    onUserEdited(userToEdit.userName, user);
                }
            }
        } catch (error) {
            alert(error);
        }
    };

    const onComplete = async () => {
        if (userToEdit) {
            onEditUser();
        } else {
            onCreateUser();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            title={userToEdit ? 'Edit User' : 'Create User'}
        >
            <CenterDialogContent dividers>

                <EditableProfilePicture
                    onPictureChange={profilePicture => setUser({ ...user, profilePicture })}
                    pic={user.profilePicture}
                    size='large'
                />

                <KidCheckbox
                    label='Kid'
                    control={
                        <Switch
                            color='primary'
                            checked={user.isKid}
                            onChange={() => setUser({ ...user, isKid: !user.isKid })}
                        />
                    }
                />

                <TextInput required
                    label='Name'
                    value={user.userName}
                    onChange={event => setUser({ ...user, userName: event.currentTarget.value })}
                />

                <PasswordInput disableEndAdornment
                    value={user.password}
                    label='Password (optional)'
                    autoComplete='new-password'
                    onChange={event => setUser({ ...user, password: event.currentTarget.value })}
                />

            </CenterDialogContent>

            <DialogActions>
                <Button
                    onClick={onComplete}
                    label={userToEdit ? 'Update' : 'Create'}
                />
            </DialogActions>

        </Dialog>
    );
};

const CenterDialogContent = styled(DialogContent)`
    ${flexCenter}
`;

const KidCheckbox = styled(FormControlLabel)`
    align-self: flex-end;
`;

export default EditUserDialog;
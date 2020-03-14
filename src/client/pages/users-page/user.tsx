import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import ConfirmDialog from '../../common/components/dialog/confirm-dialog';
import IconButtonTop from '../../common/components/icon-button-top';
import TextInput from '../../common/components/input/text-input';

import { flexCenter, boxShadow, boxShadowInset } from '../../style/mixins';
import { deleteUser, updateUser } from '../../common/utils/api-operations';

type UserProps = {
    onUserSelected: (selectedUser: User) => void;
    onUserDeleted: (deletedUsed: User) => void;
    selected?: boolean;
    edit: boolean;
    user: User;
}

const User: React.FC<UserProps> = ({ user, edit, selected, onUserSelected, onUserDeleted }: UserProps) => {

    const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>(user.userName);
    const [editingName, setEditingName] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    let userNameRef: HTMLInputElement;

    useEffect(() => {
        if (editingName) {
            userNameRef.focus();
            userNameRef.setSelectionRange(user.userName.length, user.userName.length);
        }
    }, [editingName]);

    useEffect(() => {
        if (!edit) {
            setUserName(user.userName);
            setEditingName(false);
        }
    }, [edit]);

    const onDeleteUser = async (confirmed?: boolean) => {
        if (!confirmed) {
            return setConfirmingDelete(true);
        }

        setLoading(true);
        const deletedUser = await deleteUser({ userName });

        if (deletedUser) {
            onUserDeleted(user);
        } else {
            setLoading(false);
        }
    };

    const onRenameUser = async () => {
        setLoading(true);
        try {
            const updatedUser = await updateUser({ oldUserName: user.userName, newUserName: userName });
            setLoading(false);

            if (updatedUser === userName) {
                user.userName = userName;
                setEditingName(false);
            } else {
                resetUserName();
            }

        } catch (error) {
            setLoading(false);
            resetUserName();
        }
    };

    const resetUserName = () => {
        setEditingName(false);
        setUserName(user.userName);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;

        if (key == 'Enter') {
            onRenameUser();
        } else if (key == 'Escape') {
            resetUserName();
        }
    };

    const onToggleEdit = () => {
        setEditingName(true);
    };

    const disabled = !edit || loading || !editingName;

    return (
        <UserContainer
            className={`${edit ? 'edit' : 'select'} ${loading && 'loading'} ${selected && 'selected'}`}
            onClick={() => !edit && onUserSelected(user)}
        >

            {edit &&
                <>
                    <IconButtonTop left
                        disabled={loading}
                        icon={editingName ? 'check' : 'edit'}
                        onClick={editingName ? onRenameUser : onToggleEdit}
                    />

                    <IconButtonTop right
                        icon='close'
                        disabled={loading}
                        onClick={() => editingName ? resetUserName() : onDeleteUser(false)}
                    />
                </>
            }

            <TextInput
                value={userName}
                variant='standard'
                onKeyDown={onKeyDown}
                inputRef={r => userNameRef = r}
                InputProps={{ disableUnderline: disabled }}
                disabled={disabled}
                onChange={e => setUserName(e.currentTarget.value)}
            />

            <ConfirmDialog
                open={confirmingDelete}
                onClose={() => setConfirmingDelete(false)}
                onConfirm={() => onDeleteUser(true)}
            >
                {`Are you sure you want to delete ${user.userName}?`}
            </ConfirmDialog>

        </UserContainer >
    );
};

const UserContainer = styled.div`
    ${({ theme }) => css`
        ${boxShadow}

        ${flexCenter}
        flex-direction: row;

        text-align: center;

        width: 7em;
        height: 7em;

        margin: 0.5em;
        position: relative;

        background-color: ${theme.palette.primary.main};

        user-select: none;
    `}

    input {
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.3em;
        color: white;
    }

    &.edit {
        cursor: default;
    }

    &.select, input {
        cursor: pointer;
    }

    &.selected {
        ${boxShadowInset}
    }
`;

export default User;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

import ConfirmDialog from '../../common/confirm-dialog';

import { deleteUser, updateUser } from '../../common/api-operations';
import { flexCenter, fadeIn, scaleUp } from '../../style/mixins';
import { setUser } from '../../common/user/authentication';

interface UserProps {
    edit: boolean;
    user: User;
    onUserDeleted: (deletedUsed: User) => void;
}

const User: React.FC<UserProps> = ({ edit, user, onUserDeleted }: UserProps) => {

    const [userName, setUserName] = useState<string>(user.userName);
    const [editingName, setEditingName] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [confirming, setConfirming] = useState<boolean>(false);
    let userNameRef: HTMLInputElement;

    useEffect(() => {
        if (editingName) {
            userNameRef.focus();
        }
    }, [editingName]);


    const onSelectUser = () => {
        setUser(userName);
    };

    const onDeleteUser = async (confirmed?: boolean) => {
        if (!confirmed) {
            return setConfirming(true);
        }
        
        setLoading(true);

        setTimeout(async () => {
            const deletedUser = await deleteUser({ userName });

            if (deletedUser) {
                setDeleting(true);
                setTimeout(() => {
                    onUserDeleted(user);
                }, 500);
            }

        }, 500);
    };

    const renameUser = async () => {
        setLoading(true);
        try {
            const updatedUser = await updateUser({ oldUserName: user.userName, newUserName: userName });

            setTimeout(() => {
                setLoading(false);

                if (updatedUser === userName) {
                    user.userName = userName;
                    setEditingName(false);
                } else {
                    resetUserName();
                }
            }, 500);

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
            renameUser();
        } else if (key == 'Escape') {
            resetUserName();
        }
    };

    const onToggleEdit = () => {
        setEditingName(true);
    };

    return (
        <UserContainer
            className={`${edit ? 'edit' : 'select'} ${loading && 'loading'} ${deleting && 'deleting'}`}
            to='/household'
            onClick={e => edit ? e.preventDefault() : onSelectUser()}
        >

            {edit &&
                <>
                    <ToggleEditButton
                        disabled={loading}
                        onClick={onToggleEdit}
                    >
                        {editingName ?
                            <CloseIcon />
                            :
                            <EditIcon />
                        }
                    </ToggleEditButton>

                    <DeleteButton
                        disabled={loading || editingName}
                        onClick={() => onDeleteUser(false)}
                    >
                        <CloseIcon />
                    </DeleteButton>
                </>
            }

            <UserName>
                <UserNameField
                    inputRef={r => userNameRef = r}
                    onKeyDown={onKeyDown}
                    onBlur={resetUserName}
                    value={userName}
                    disabled={loading || !editingName}
                    onChange={e => setUserName(e.currentTarget.value)}
                />
            </UserName>

            <ConfirmDialog
                open={confirming}
                onClose={() => setConfirming(false)}
                onConfirm={() => onDeleteUser(true)}
                messages={[`Are you sure you want to delete ${user.userName}? \nThis action is irreversible!`]}
            />

        </UserContainer >
    );
};

const UserContainer = styled(Link)`
    ${scaleUp(0.5)}

    ${flexCenter}
    flex-direction: row;

    width: 7em;
    height: 7em;

    color: #9c27b0;
    font-size: 1.3em;
    border: 1px solid rgba(156, 39, 176, 0.7);
    text-decoration: none;

    margin: 0.5em;
    position: relative;

    &.deleting {
        transition: all 0.5s;
        border-width: 0px;
        margin: 0em;
        width: 0em;
    }

    &.edit {
        cursor: default;
    }

    &.select:hover {
        transition: all 0.2s;
        background: rgba(156, 39, 176, 0.1);
        border-color: #9c27b0;

        transform: scale(1.2);

        * { 
            cursor: pointer;
        }
    }

    * {
        transition: color 0.2s;
    }

    &.deleting * {
        color: rgba(255, 255, 255, 0);
    }
`;

const UserName = styled.span`
    justify-self: center;
    text-align: center;
`;

const UserNameField = styled(TextField)`
    input {
        text-align: center;
        color: #9c27b0;
        font-size: 1.4em;
        margin: 0;
        border-bottom: 1px solid #9c27b0; 
    }
`;

const ToggleEditButton = styled(IconButton)`
  && {
        ${fadeIn(0.2)}
        position: absolute;
        top: 0;
        left: 0;
        color: purple;

        &:hover {
            transition: all 0.2s;
            transform: scale(1.3);
        }
    }
`;

const DeleteButton = styled(ToggleEditButton)`
    && {
        left: unset;
        right: 0;
    }
`;

export default User;
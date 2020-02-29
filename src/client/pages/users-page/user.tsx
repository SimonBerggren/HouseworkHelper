import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/check";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from 'react';
import styled from 'styled-components';

import { IconButton, TextField, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { deleteUser } from "../../common/api-operations";
import { flexCenter } from '../../style/mixins';


interface UserProps {
    edit: boolean;
    user: User;
    onClick: () => void;
    onUserDeleted: () => void;
}

const User: React.FC<UserProps> = ({ edit, user, onClick, onUserDeleted }) => {

    const [userName, setUserName] = useState(user.userName);
    const [editingName, setEditingName] = useState(false);
    const [renaming, setRenaming] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const onDeleteUser = async () => {
        if (confirm(
            `Are you sure you want to delete ${userName}? \nThis action is irreversible!`)
        ) {
            setDeleting(true);

            setTimeout(async () => {
                const deletedUser = await deleteUser({ userName });

                if (deletedUser) {
                    onUserDeleted();
                }

                setDeleting(false);
            }, 2000);

        }
    }

    const renameUser = () => {
        if (!renaming) {
            setRenaming(true);
            setTimeout(() => {
                user.userName = userName;
                setEditingName(false);
                setRenaming(false);
            }, 2000);
        }
    }

    const resetUserName = () => {
        setEditingName(false);
        setUserName(user.userName);
    }

    const onUserNameChange = (userName: string) => {
        if (!renaming) {
            setUserName(userName);
        }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;

        if (key == 'Enter') {
            renameUser();
        } else if (key == 'Escape') {
            resetUserName();
        }
    }


    return (
        <UserContainer
            className={edit ? 'edit' : ''}
            to='/household'
            onClick={e => edit ? e.preventDefault() : onClick()}
        >

            {edit &&
                <ToggleEditButton
                    onClick={() => (renaming || deleting) ? null : editingName ? renameUser() : setEditingName(true)}
                >
                    {
                        renaming ?
                            <CircularProgress
                                size='1.5em'
                            />
                            :
                            editingName ?
                                <CheckIcon />
                                :
                                <EditIcon />

                    }
                </ToggleEditButton>
            }

            {
                edit &&
                <DeleteButton
                    onClick={() => (renaming || deleting) ? null : onDeleteUser()}
                >
                    {deleting ?
                        <CircularProgress
                            size='1.5em'
                        />
                        :
                        <CloseIcon />
                    }
                </DeleteButton>
            }

            <UserName>
                {editingName ?

                    <UserNameField
                        onKeyDown={onKeyDown}
                        onBlur={resetUserName}
                        value={userName}
                        onChange={e => onUserNameChange(e.currentTarget.value)}
                        autoFocus
                    />
                    :
                    user.userName

                }
            </UserName>


        </UserContainer >
    )
}

const UserContainer = styled(Link)`
    ${flexCenter}
    flex-direction: row;

    width: 7em;
    height: 7em;

    color: #9c27b0;
    font-size: 1.3em;
    border: 1px solid rgba(156, 39, 176, 0.7);
    transition: all 0.2s;
    text-decoration: none;

    margin: 0.5em;
    position: relative;

    &.edit {
        cursor: default;
    }

    :not(.edit):hover {
        background: rgba(156, 39, 176, 0.1);
        border-color: #9c27b0;
        transition: all 0.2s;

        width: 8em;
        height: 8em;

        margin: 0;
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
        font-size: 1.3em;
    }
`;

const ToggleEditButton = styled(IconButton)`
  && {
        position: absolute;
        top: 0;
        left: 0;
        color: purple;
    }
`;

const DeleteButton = styled(ToggleEditButton)`
    && {
        left: unset;
        right: 0;
    }
`;

export default User;
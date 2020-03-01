import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

import { IconButton, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { flexCenter, fadeIn, scaleUp } from '../../style/mixins';
import { deleteUser } from '../../common/api-operations';
import { setUser } from '../../common/user/authentication';


interface UserProps {
    edit: boolean;
    user: User;
    onUserDeleted: (deletedUsed: User) => void;
}

const User: React.FC<UserProps> = ({ edit, user, onUserDeleted }: UserProps) => {

    const [userName, setUserName] = useState(user.userName);
    const [editingName, setEditingName] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [loading, setLoading] = useState(false);
    let ref: HTMLInputElement;

    useEffect(() => {
        if (editingName) {
            ref.focus();
        }
    }, [editingName]);


    const onSelectUser = () => {
        setUser(userName);
    };

    const onDeleteUser = async () => {
        if (confirm(
            `Are you sure you want to delete ${userName}? \nThis action is irreversible!`)
        ) {
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

        }
    };

    const renameUser = () => {
        setLoading(true);
        setTimeout(() => {
            user.userName = userName;
            setLoading(false);
            setEditingName(false);
        }, 500);
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
                        <EditIcon />
                    </ToggleEditButton>

                    <DeleteButton
                        disabled={loading}
                        onClick={onDeleteUser}
                    >
                        <CloseIcon />
                    </DeleteButton>
                </>
            }

            <UserName>
                <UserNameField
                    inputRef={r => ref = r}
                    onKeyDown={onKeyDown}
                    onBlur={resetUserName}
                    value={userName}
                    disabled={loading || !editingName}
                    onChange={e => setUserName(e.currentTarget.value)}
                />
            </UserName>


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
    }
`;

const DeleteButton = styled(ToggleEditButton)`
    && {
        left: unset;
        right: 0;
    }
`;

export default User;
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import PasswordInput from '../../common/components/input/password-input';
import ProfilePicture from '../../common/components/profile-picture';
import IconButtonTop from '../../common/components/icon-button-top';
import IconButton from '../../common/components/icon-button';

import { boxShadow, boxShadowInset, boxShadowNone, flexCenter } from '../../style/mixins';
import { loginUser } from '../../common/utils/api-operations';
import { setUser } from '../../common/user/user-info';
import { setToken } from '../../common/user/authentication';

type UserProps = {
    onUserSelected: (selectedUser: User) => void;
    onDeleteUser: (userToDelete: User) => void;
    onEditUser: (userToEdit: User) => void;
    editMode: boolean;
    user: User;
}

const User: React.FC<UserProps> = ({ user, editMode, onUserSelected, onDeleteUser, onEditUser }: UserProps) => {

    const [passwordMode, setPasswordMode] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    let inputRef: HTMLInputElement;

    const onUserSelect = () => {

        if (editMode) {
            return;
        }

        if (user.password) {
            setPasswordMode(true);
            return inputRef.focus();
        }

        onUserSelected(user);
    };

    const onUserLogin = async () => {

        try {
            if (password) {
                const userToken = await loginUser(user.userName, password);

                if (userToken) {
                    setUser(user);
                    setToken(userToken);
                    onUserSelected(user);
                } else {
                    disablePasswordMode();
                    alert('Something went wrong when generating user token');
                }
            }
        } catch (error) {
            disablePasswordMode();
            alert(error);
        }
    };

    const disablePasswordMode = () => {
        if (!editMode) {
            setPasswordMode(false);
            setPassword('');
        }
    };

    const onPasswordKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onUserLogin();
        } else if (event.key === 'Escape') {
            inputRef.blur();
        }
    };

    const cssPasswordMode = passwordMode ? 'password-mode' : '';
    const cssEditSelectMode = editMode ? 'edit' : 'select';

    return (
        <UserContainer
            className={`
                ${cssPasswordMode}
                ${cssEditSelectMode}-mode
            `}
            onClick={onUserSelect}
            onBlur={disablePasswordMode}
        >

            <>
                <IconButtonTop left
                    size='small'
                    icon='edit'
                    disabled={!editMode}
                    onClick={() => onEditUser(user)}
                />

                <IconButtonTop right
                    disabled={!editMode}
                    icon='delete'
                    size='small'
                    onClick={() => onDeleteUser(user)}
                />
            </>

            <ProfilePicture
                pic={user.profilePicture}
            />

            <UserName>{user.userName}</UserName>

            <Password disableEndAdornment
                className={cssPasswordMode}
                size='small'
                value={password}
                placeholder='Password'
                inputRef={r => inputRef = r}
                onChange={event => setPassword(event.currentTarget.value)}
                onKeyDown={onPasswordKeyDown}
            />

        </UserContainer >
    );
};

const UserContainer = styled.div`
    ${({ theme }) => css`
        ${boxShadow}

        ${flexCenter}
        justify-content: center;

        text-align: center;

        width: 100px;
        height: 100px;

        padding: 10px;
        margin:  10px;
        position: relative;

        background-color: ${theme.palette.primary.main};

        user-select: none;

        * {
            transition: width 0.5s, height 0.5s, padding 0.5s, margin 0.5s, opacity 0.5s;
        }

        &.edit-mode {
            cursor: default;
        }

        &.select-mode {
            cursor: pointer;
        }

        &.password-mode {
            ${boxShadowInset}

            img {
                ${boxShadowNone}
            }
        }

        &.password-mode {
            img {
                height: 40%;
                width: 40%;
                margin: 0px;
                padding: 0px;
            }
        }
    `}
`;

const Password = styled(PasswordInput)`
&& {

    fieldset {
        border: none;
    }
    
    &:not(.password-mode) {
        margin-top: 0px;
        margin-bottom: 0px;

        input {
            height: 0px;
            padding-top: 0px;
            padding-bottom: 0px;
        }
    }

    margin-top: 5px;
    margin-bottom: 0px;
    
    input{ 
        padding: 2px;
    }
}
`;

const UserName = styled.h4`
    color: white;
`;

export default User;
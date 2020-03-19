import React from 'react';
import styled, { css } from 'styled-components';

import ProfilePicture from '../../common/components/profile-picture';
import IconButtonTop from '../../common/components/icon-button-top';

import { boxShadow, boxShadowInset, boxShadowNone } from '../../style/mixins';

type UserProps = {
    onUserSelected: (selectedUser: User) => void;
    onDeleteUser: (userToDelete: User) => void;
    onEditUser: (userToEdit: User) => void;
    selected?: boolean;
    editMode: boolean;
    user: User;
}

const User: React.FC<UserProps> = ({ user, editMode, selected, onUserSelected, onDeleteUser, onEditUser }: UserProps) => {

    return (
        <UserContainer
            className={`${editMode ? 'edit' : 'select'} ${selected && 'selected'}`}
            onClick={() => !editMode && onUserSelected(user)}
        >

            {editMode &&
                <>
                    <IconButtonTop left
                        size='small'
                        icon='edit'
                        onClick={() => onEditUser(user)}
                    />

                    <IconButtonTop right
                        icon='delete'
                        size='small'
                        onClick={() => onDeleteUser(user)}
                    />
                </>
            }

            <TopPicture pic={user.profilePicture} />

            <UserName>{user.userName}</UserName>

        </UserContainer >
    );
};

const UserContainer = styled.div`
    ${({ theme }) => css`
        ${boxShadow}

        display: flex;
        align-items: center;
        flex-direction: column;

        text-align: center;

        width: 100px;
        height: 100px;

        padding: 10px;
        margin:  10px;
        position: relative;

        background-color: ${theme.palette.primary.main};

        user-select: none;
    `}

    &.edit {
        cursor: default;
    }

    &.select {
        cursor: pointer;
    }

    &.selected {
        ${boxShadowInset}

        img {
            ${boxShadowNone}
        }
    }
`;

const TopPicture = styled(ProfilePicture)`
    position: absolute;
    top:  0;
`;

const UserName = styled.h4`
    color: white;
`;

export default User;
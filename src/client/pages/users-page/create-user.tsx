import React, { useState } from 'react';
import styled from 'styled-components';

import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { createUser } from '../../common/api-operations';

interface CreateUserProps {
    onUserCreated: (createdUser: User) => void;
    onClose: () => void;
    open: boolean;
}

const CreateUser: React.FC<CreateUserProps> = ({ onUserCreated, onClose, open }: CreateUserProps) => {

    const [newUserName, setNewUserName] = useState('');

    const onCreateUser = async () => {
        const createdUser = await createUser({ userName: newUserName });

        if (createdUser) {
            onUserCreated(createdUser);
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.key;

        if (key == 'Enter') {
            onCreateUser();
        } else if (key == 'Escape') {
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <Title >

                Create New User

                <CloseButton
                    onClick={onClose}
                >
                    <CloseIcon />
                </CloseButton>

            </Title>
            <DialogContent dividers>
                <UserNameField
                    onChange={e => setNewUserName(e.currentTarget.value)}
                    onKeyDown={onKeyDown}
                    autoFocus
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onCreateUser}
                    color='primary'
                >
                    Create New User
                </Button>
            </DialogActions>
        </Dialog >
    );
};

const Title = styled(DialogTitle)`
    color: #9c27b0;
`;

const CloseButton = styled(IconButton)`
    && { 
        position: absolute;
        top: 0.3em;
        right: 0.3em;
        color: #9c27b0;
    }
`;

const UserNameField = styled(TextField)`
    input{
        text-align: center;
        color: #9c27b0;
        font-size: 1.3em;
    }
`;

export default CreateUser;
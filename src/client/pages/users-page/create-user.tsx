import React, { useState } from 'react';

import { DialogContent, DialogActions } from '@material-ui/core';

import TextInput from '../../common/components/input/text-input';
import Button from '../../common/components/button';

import { createUser } from '../../common/utils/api-operations';
import Dialog from '../../common/components/dialog/dialog';

type CreateUserProps = {
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
            title='Create New User'
        >
            
            <DialogContent dividers>

                <TextInput
                    onChange={e => setNewUserName(e.currentTarget.value)}
                    onKeyDown={onKeyDown}
                    variant='standard'
                    autoFocus
                />

            </DialogContent>
            <DialogActions>

                <Button
                    onClick={onCreateUser}
                    label='Create New User'
                    color='primary'
                />

            </DialogActions>
        </Dialog >
    );
};

export default CreateUser;
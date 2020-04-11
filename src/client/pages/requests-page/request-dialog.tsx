import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import Dialog, { DialogProps as IDialogProps } from '../../common/components/dialog/dialog';
import Button from '../../common/components/button';

import { getTasks, getUsers } from '../../common/utils/api-operations';
import TextInput from '../../common/components/input/text-input';

type RequestDialogProps = IDialogProps & {
    onRequestCreate: () => void;
}

const RequestDialog: React.FC<RequestDialogProps> = ({ onRequestCreate, ...props }: RequestDialogProps) => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [taskName, setTaskName] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [comments, setComments] = useState<string>('');
    const [extraPoints, setExtraPoints] = useState<number>(0);

    useEffect(() => {
        getTasks().then(setTasks);
        getUsers().then(setUsers);
    }, []);

    const onSelectedTaskChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const taskName = e.target.value as string;
        const task = tasks.find(t => t.taskName === taskName);

        if (task) {
            setExtraPoints(task.points);
            setTaskName(taskName);
        }
    };

    return (
        <Dialog
            {...props}
            title='Make a request'
        >

            <WideDialogContent dividers>

                <FormControl fullWidth >
                    <InputLabel required >{'Ask'}</InputLabel>

                    <Select
                        value={userName}
                        onChange={e => setUserName(e.target.value as string)}
                    >
                        {users.map((user, key) =>
                            <MenuItem
                                key={key}
                                value={user.userName}
                            >
                                {user.userName}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl fullWidth >
                    <InputLabel required >{'To'}</InputLabel>

                    <Select
                        value={taskName}
                        onChange={onSelectedTaskChange}
                    >
                        {tasks.map((task, key) =>
                            <MenuItem
                                key={key}
                                value={task.taskName}
                            >
                                {task.taskName} -
                                {task.points}p
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                <TextInput fullWidth
                    type='number'
                    variant='standard'
                    label='Extra Points'
                    value={extraPoints}
                    onChange={e => setExtraPoints(parseInt(e.currentTarget.value))}
                />

                <TextInput fullWidth multiline
                    variant='standard'
                    label='Comments'
                    value={comments}
                    onChange={e => setComments(e.currentTarget.value)}
                />

            </WideDialogContent>

            <DialogActions>
                <Button
                    label='Create'
                    onClick={onRequestCreate}
                />
            </DialogActions>

        </Dialog>
    );
};

const WideDialogContent = styled(DialogContent)`
&& {
    min-width: 300px;
}
`;

export default RequestDialog;
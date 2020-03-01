import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, IconButton, Checkbox, FormControlLabel, ListItemText, Input } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { createTask, getUsers, updateTask } from '../../common/api-operations';
import { frequencies } from '../../../common/frequencies';
import { UserContext } from '../../app/user-context';

interface TaskProps {
    onTaskCreated: (taskToCreate: Task) => void;
    onTaskEdited: (oldTask: Task, updatedTask: Task) => void;
    onClose: () => void;
    editTask?: Task;
    open: boolean;
}

const defaultValues = (defaultTask?: Task): Task => {
    return {
        taskName: defaultTask ? defaultTask.taskName : '',
        desc: defaultTask ? defaultTask.desc : '',
        frequency: defaultTask ? defaultTask.frequency : '',
        points: defaultTask ? defaultTask.points : 0,
        visibleTo: defaultTask ? defaultTask.visibleTo : [],
        visibleToAll: defaultTask ? defaultTask.visibleToAll : true
    };
};

const EditTask: React.FC<TaskProps> = ({ open, editTask, onClose, onTaskCreated, onTaskEdited }: TaskProps) => {

    const [task, setTask] = useState<Task>(defaultValues(editTask));
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setTask(defaultValues(editTask));
        if (!users.length || (!users.length && editTask)) {
            getUsers()
                .then(users => setUsers(users));
        }
    }, [open, editTask]);

    const onCreateTask = async (taskToCreate: Task) => {
        const createdTask = await createTask(taskToCreate);

        if (createdTask) {
            onTaskCreated(createdTask);
            onClose();
        }
    };

    const onEditTask = async () => {

        if (editTask) {
            const updatedTask = await updateTask({ task, taskToUpdate: editTask.taskName });

            if (updatedTask) {
                onTaskEdited(editTask, task);
            }
        }
    };

    const onCloseModal = () => {
        onClose();
    };

    return (
        <UserContext.Consumer>
            {userContext =>
                <Dialog
                    open={editTask != undefined || open}
                    onClose={onCloseModal}
                >
                    <Title>
                        {editTask ? 'Edit Task' : 'Create New Task'}

                        <CloseButton
                            onClick={onCloseModal}
                        >
                            <CloseIcon />
                        </CloseButton>
                    </Title>

                    <DialogContent dividers>

                        <InputField
                            label='Title'
                            helperText='What is the task?'
                            defaultValue={task.taskName}
                            onChange={e => setTask({ ...task, taskName: e.currentTarget.value })}
                            required
                        />

                        <InputField
                            label='Description'
                            helperText='Describe the task in more detail if needed'
                            defaultValue={task.desc}
                            onChange={e => setTask({ ...task, desc: e.currentTarget.value })}
                            multiline
                        />

                        <InputField
                            type='number'
                            label='Reward Points'
                            helperText='Select how much this is worth'
                            defaultValue={task.points}
                            onChange={e => setTask({ ...task, points: parseInt(e.currentTarget.value) })}
                            required
                        />

                        <SelectField>
                            <InputLabel>Visible To</InputLabel>

                            <Select
                                multiple
                                disabled={task.visibleToAll}
                                input={<Input />}
                                renderValue={(userNames: any) => userNames.join(', ')}
                                value={task.visibleTo}
                                onChange={e => setTask({ ...task, visibleTo: e.target.value as string[] })}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left'
                                    },
                                    getContentAnchorEl: null
                                }}
                            >
                                {users && users.map((user, key) =>
                                    <MenuItem
                                        key={key}
                                        value={user.userName}
                                        disabled={user.userName === userContext.userName}
                                    >
                                        <Checkbox
                                            checked={user.userName === userContext.userName || task.visibleTo.indexOf(user.userName) >= 0}
                                        />
                                        <ListItemText primary={user.userName} />
                                    </MenuItem>
                                )}
                            </Select>

                            <FormHelperText>Select which users this task is visible to</FormHelperText>
                        </SelectField>

                        <CheckboxField
                            control={
                                <Checkbox
                                    checked={task.visibleToAll}
                                    onChange={() => setTask({ ...task, visibleToAll: !task.visibleToAll, visibleTo: !task.visibleToAll ? [] : [userContext.userName] })}
                                    color='primary'
                                />
                            }
                            label='All'
                        />

                        <SelectField>
                            <InputLabel required >Frequency</InputLabel>

                            <Select
                                value={task.frequency}
                                onChange={e => setTask({ ...task, frequency: e.target.value as string })}
                            >
                                {frequencies.map((frequency, key) =>
                                    <MenuItem
                                        key={key}
                                        value={frequency}
                                    >
                                        {frequency}
                                    </MenuItem>
                                )}
                            </Select>

                            <FormHelperText>Select how frequently this task needs to be perfomed</FormHelperText>
                        </SelectField>

                    </DialogContent>
                    <DialogActions >
                        <SignupButton
                            onClick={() => editTask ?
                                onEditTask()
                                :
                                onCreateTask(task)
                            }
                            color='primary'
                            variant='contained'
                        >
                            {editTask ? 'Save' : 'Create Task'}
                        </SignupButton>
                    </DialogActions>
                </Dialog>
            }
        </UserContext.Consumer>
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
    }
`;

const InputField = styled(TextField)`
    width: 20em;
`;

const CheckboxField = styled(FormControlLabel)`
    display: inline-block;
`;

const SelectField = styled(FormControl)`
    width: 20em;
`;

const SignupButton = styled(Button)`
    width: 15em;
`;

export default EditTask;
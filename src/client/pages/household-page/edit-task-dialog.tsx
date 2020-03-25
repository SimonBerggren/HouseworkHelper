import React, { useState, useEffect } from 'react';

import { DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Input, FormControlLabel } from '@material-ui/core';

import ConfirmDialog from '../../common/components/dialog/confirm-dialog';
import TextInput from '../../common/components/input/text-input';
import Dialog from '../../common/components/dialog/dialog';
import Button from '../../common/components/button';

import { createTask, getUsers, editTask } from '../../common/utils/api-operations';
import { frequencies } from '../../../common/frequencies';
import { getUser } from '../../common/user/user-info';
import { UserContext } from '../../app/user-context';

type EditTaskDialogProps = {
    onTaskCreated: (taskToCreate: Task) => void;
    onTaskEdited: (oldTask: Task, updatedTask: Task) => void;
    onClose: () => void;
    taskToEdit?: Task;
    open: boolean;
}

const defaultValues = (defaultTask?: Task): Task => {
    return {
        taskName: defaultTask ? defaultTask.taskName : '',
        desc: defaultTask ? defaultTask.desc : '',
        frequency: defaultTask ? defaultTask.frequency : '',
        points: defaultTask ? defaultTask.points : 0,
        visibleTo: defaultTask ? defaultTask.visibleTo : [(getUser() as User).userName],
        visibleToEveryone: defaultTask ? defaultTask.visibleToEveryone : true
    };
};

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({ open, taskToEdit, onClose, onTaskCreated, onTaskEdited }: EditTaskDialogProps) => {

    const [task, setTask] = useState<Task>(defaultValues(taskToEdit));
    const [users, setUsers] = useState<User[]>([]);
    const [confirmingCreateMore, setConfirmingCreateMore] = useState<boolean>(false);

    useEffect(() => {
        if (open || taskToEdit) {
            setTask(defaultValues(taskToEdit));
            if (!users.length || (!users.length && taskToEdit)) {
                getUsers()
                    .then(users => setUsers(users));
            }
        }
    }, [open, taskToEdit]);

    const onEditTask = async () => {

        if (taskToEdit) {
            const updatedTask = await editTask({ task, taskToUpdate: taskToEdit.taskName });

            if (updatedTask) {
                onTaskEdited(taskToEdit, task);
                onClose();
            }
        }
    };

    const onCreateTask = async (taskToCreate: Task) => {
        const createdTask = await createTask(taskToCreate);

        if (createdTask) {
            onTaskCreated(createdTask);
            setConfirmingCreateMore(true);
        }
    };

    const onCreateMoreConfirmed = () => {
        setTask(defaultValues());
        setConfirmingCreateMore(false);
    };

    const onCreateMoreDeclined = () => {
        setTask(defaultValues());
        setConfirmingCreateMore(false);
        onClose();
    };

    return (
        <UserContext.Consumer>
            {({ user: loggedInUser }) =>
                <>
                    <Dialog
                        onClose={onClose}
                        open={taskToEdit != undefined || open}
                        title={taskToEdit ? 'Edit Task' : 'Create New Task'}
                    >
                        <DialogContent dividers>

                            <TextInput fullWidth required
                                label='Title'
                                variant='standard'
                                value={task.taskName}
                                onChange={e => setTask({ ...task, taskName: e.currentTarget.value })}
                            />

                            <TextInput fullWidth multiline
                                variant='standard'
                                label='Description'
                                value={task.desc}
                                onChange={e => setTask({ ...task, desc: e.currentTarget.value })}
                            />

                            <TextInput fullWidth required
                                type='number'
                                variant='standard'
                                label='Reward Points'
                                rows='3'
                                value={task.points}
                                onChange={e => setTask({ ...task, points: parseInt(e.currentTarget.value) })}
                            />

                            <FormControl fullWidth >
                                <InputLabel required >{'Frequency'}</InputLabel>

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
                            </FormControl>

                            <FormControlLabel
                                label='Visible to everyone?'
                                control={
                                    <Checkbox
                                        checked={task.visibleToEveryone}
                                        onChange={e => setTask({ ...task, visibleToEveryone: e.target.checked })}
                                    />
                                }
                            />

                            {!task.visibleToEveryone && <FormControl fullWidth >
                                <InputLabel>{'Visible to'}</InputLabel>

                                <Select
                                    disabled={task.visibleToEveryone}
                                    multiple
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
                                            disabled={loggedInUser && loggedInUser.userName === user.userName}
                                        >
                                            <Checkbox
                                                checked={(loggedInUser && loggedInUser.userName === user.userName) || task.visibleTo.indexOf(user.userName) >= 0}
                                            />
                                            <ListItemText primary={user.userName} />
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>}

                        </DialogContent>
                        <DialogActions >
                            <Button
                                label={taskToEdit ? 'Save' : 'Create Task'}
                                onClick={() => taskToEdit ? onEditTask() : onCreateTask(task)}
                            />
                        </DialogActions>
                    </Dialog>

                    <ConfirmDialog
                        open={confirmingCreateMore}
                        onClose={onCreateMoreDeclined}
                        onConfirm={onCreateMoreConfirmed}
                        title='Success!'
                    >
                        {'Do you want to create more tasks?'}
                    </ConfirmDialog>
                </>
            }
        </UserContext.Consumer>
    );
};

export default EditTaskDialog;
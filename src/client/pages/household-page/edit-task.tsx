import React, { useState, useEffect } from 'react';

import { DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Input } from '@material-ui/core';

import TextInput from '../../common/components/input/text-input';
import Dialog from '../../common/components/dialog/dialog';
import Button from '../../common/components/button';

import { createTask, getUsers, updateTask } from '../../common/utils/api-operations';
import { frequencies } from '../../../common/frequencies';
import { getUserName } from '../../common/user/user-info';
import { UserContext } from '../../app/user-context';

type TaskProps = {
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
        visibleTo: defaultTask ? defaultTask.visibleTo : [getUserName()]
    };
};

const EditTask: React.FC<TaskProps> = ({ open, editTask, onClose, onTaskCreated, onTaskEdited }: TaskProps) => {

    const [task, setTask] = useState<Task>(defaultValues(editTask));
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (open || editTask) {
            setTask(defaultValues(editTask));
            if (!users.length || (!users.length && editTask)) {
                getUsers()
                    .then(users => setUsers(users));
            }
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
                onClose();
            }
        }
    };

    return (
        <UserContext.Consumer>
            {userContext =>
                <Dialog
                    onClose={onClose}
                    open={editTask != undefined || open}
                    title={editTask ? 'Edit Task' : 'Create New Task'}
                >
                    <DialogContent dividers>

                        <TextInput fullWidth required margin='normal'
                            label='Title'
                            variant='standard'
                            defaultValue={task.taskName}
                            onChange={e => setTask({ ...task, taskName: e.currentTarget.value })}
                        />

                        <TextInput fullWidth multiline margin='normal'
                            variant='standard'
                            label='Description'
                            defaultValue={task.desc}
                            onChange={e => setTask({ ...task, desc: e.currentTarget.value })}
                        />

                        <TextInput fullWidth required margin='normal'
                            type='number'
                            variant='standard'
                            label='Reward Points'
                            rows='3'
                            defaultValue={task.points}
                            onChange={e => setTask({ ...task, points: parseInt(e.currentTarget.value) })}
                        />


                        <FormControl fullWidth margin='normal'>
                            <InputLabel>{'Visible to'}</InputLabel>
                            <Select
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
                                        disabled={user.userName === userContext.userName}
                                    >
                                        <Checkbox
                                            checked={user.userName === userContext.userName || task.visibleTo.indexOf(user.userName) >= 0}
                                        />
                                        <ListItemText primary={user.userName} />
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>


                        <FormControl fullWidth margin='normal'>
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

                    </DialogContent>
                    <DialogActions >
                        <Button
                            label={editTask ? 'Save' : 'Create Task'}
                            onClick={() => editTask ? onEditTask() : onCreateTask(task)}
                        />
                    </DialogActions>
                </Dialog>
            }
        </UserContext.Consumer>
    );
};

export default EditTask;
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import ConfirmDialog from '../../common/components/dialog/confirm-dialog';
import IconButton from '../../common/components/icon-button';
import CompleteTaskDialog from './complete-task-dialog';
import EditTaskDialog from './edit-task-dialog';

import { deleteTask, completeTask } from '../../common/utils/api-operations';
import { addUserPoints } from '../../common/user/user-info';
import { UserContext } from '../../app/user-context';

type TasksProps = {
    onTaskDeleted: (task: Task) => void;
    onTaskCreated: (task: Task) => void;
    onTaskEdited: (oldTask: Task, updatedTask: Task) => void;
    tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks, onTaskDeleted, onTaskCreated, onTaskEdited }: TasksProps) => {

    const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false);
    const [showCreateTask, setShowCreateTask] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task>();
    const [taskToDelete, setTaskToDelete] = useState<Task>();
    const [editTask, setEditTask] = useState<Task>();

    const onDeleteTask = (task: Task) => {
        setTaskToDelete(task);
        setConfirmingDelete(true);
    };

    const onDeleteTaskConfirmed = async () => {
        if (taskToDelete) {
            const deletedTask = await deleteTask({ taskName: taskToDelete.taskName });

            if (deletedTask) {
                setTimeout(() => {
                    onTaskDeleted(deletedTask);
                }, 500);
            }
        }
        onDialogClose();
    };

    const onCompleteTask = async (taskToComplete: Task, userName: string) => {
        const completed = await completeTask({ taskName: taskToComplete.taskName, userName });

        if (completed) {
            addUserPoints(taskToComplete.points);

            onDialogClose();
        }
    };

    const onDialogClose = () => {
        setEditTask(undefined);
        setShowCreateTask(false);
        setSelectedTask(undefined);
        setConfirmingDelete(false);
    };

    return (
        <UserContext.Consumer>
            {({ user }) =>
                <>
                    <TableContainer style={{ width: '90%' }}>
                        <Table stickyHeader size='small'>
                            <TableHead>
                                <TableRow>

                                    <TH padding='none' style={{ width: '25%' }}>
                                        <SmallIconButton

                                            style={{ padding: '0px' }}
                                            onClick={() => setShowCreateTask(true)}
                                            icon='add'
                                        />
                                    </TH>

                                    <TH style={{ width: '50%' }}>
                                        Task
                                    </TH>

                                    <TH padding='none' style={{ width: '20%' }} align='right'>
                                        Frequency
                                    </TH>

                                    <TH  style={{ width: '10%' }} align='right'>
                                        Points
                                    </TH>

                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {tasks.map((task, key) => (

                                    <BodyTR
                                        key={key}
                                        onClick={() => setSelectedTask(task)}
                                        style={{ cursor: 'pointer' }}
                                        className={`${taskToDelete && taskToDelete.taskName === task.taskName && 'deleting'} ${key % 2 ? 'odd' : 'even'}`}
                                    >
                                        <TableCell padding='none' style={{ minWidth: '20px' }}>
                                            <SmallIconButton
                                                onClick={e => { e.stopPropagation(); setEditTask(task); }}
                                                size='small'
                                                icon='edit'
                                            />

                                            <SmallIconButton
                                                onClick={e => { e.stopPropagation(); onDeleteTask(task); }}
                                                size='small'
                                                icon='delete'
                                            />
                                        </TableCell>

                                        <TableCell
                                            size='small'
                                            padding='none'
                                        >
                                            <h4>{task.taskName}</h4>
                                            <p>{task.desc}</p>

                                        </TableCell>

                                        <TableCell
                                            padding='none'
                                            align='right'
                                        >
                                            {task.frequency}
                                        </TableCell>

                                        <TableCell
                                            align='right'
                                        >
                                            {task.points}
                                        </TableCell>

                                    </BodyTR>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <EditTaskDialog
                        onTaskCreated={onTaskCreated}
                        onClose={onDialogClose}
                        onTaskEdited={onTaskEdited}
                        open={showCreateTask}
                        taskToEdit={editTask}
                    />

                    <CompleteTaskDialog
                        onClose={onDialogClose}
                        task={selectedTask}
                        onCompleteTask={task => onCompleteTask(task, user.userName)}
                    />

                    <ConfirmDialog
                        open={confirmingDelete}
                        onClose={onDialogClose}
                        onConfirm={onDeleteTaskConfirmed}
                    >
                        {`Are you sure you want to delete ${taskToDelete?.taskName}?`}
                    </ConfirmDialog>
                </>
            }
        </UserContext.Consumer>
    );
};

const TH = styled(TableCell)`
    && {
        ${({ theme }) => css`
            background-color: ${theme.palette.primary.main};
            color: white;
        `}
    }
`;

const BodyTR = styled(TableRow)`
    ${({ theme }) => css`
        background-color: ${theme.palette.primary.main};

        &.odd {
            background-color: ${theme.palette.primary.light};
            h4, p {
                color: white ;
                white-space: nowrap;
                max-width: 170px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        &.even {
            background-color: white;

            button {
                color: ${theme.palette.primary.light};
            }
        }

        &:hover {
            background-color: ${theme.palette.primary.main};
        }

        .deleting {
            opacity: 0.5;
            pointer-events: none;
        }
    `}
`;

const SmallIconButton = styled(IconButton)`
    padding: 0px;
`;

export default Tasks;
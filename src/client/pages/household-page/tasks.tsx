import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import ConfirmDialog from '../../common/components/dialog/confirm-dialog';
import IconButton from '../../common/components/icon-button';
import CompleteTask from './complete-task';
import TaskForm from './edit-task';

import { deleteTask, completeTask } from '../../common/utils/api-operations';
import { UserContext } from '../../app/user-context';
import { addUserPoints } from '../../common/user/user-info';


type TasksProps = {
    onTaskCompleted: (task: Task) => void;
    onTaskDeleted: (task: Task) => void;
    onTaskCreated: (task: Task) => void;
    onTaskEdited: (oldTask: Task, updatedTask: Task) => void;
    tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks, onTaskCompleted, onTaskDeleted, onTaskCreated, onTaskEdited }: TasksProps) => {

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
        setConfirmingDelete(false);
    };

    const onCompleteTask = async (taskToComplete: Task, userName: string) => {
        const completed = await completeTask({ taskName: taskToComplete.taskName, userName });

        if (completed) {
            addUserPoints(taskToComplete.points);
            onTaskCompleted(taskToComplete);
            setSelectedTask(undefined);
        }
    };

    const onTaskModalClose = () => {
        setEditTask(undefined);
        setShowCreateTask(false);
    };

    return (
        <UserContext.Consumer>
            {userContext =>
                <>
                    <TableContainer style={{ width: '90%' }}>
                        <Table stickyHeader size='small'>
                            <TableHead>
                                <TableRow>

                                    <TH padding='none' style={{ width: '15%' }}>
                                        <SmallIconButton

                                            style={{ padding: '0px' }}
                                            onClick={() => setShowCreateTask(true)}
                                            icon='add'
                                        />
                                    </TH>

                                    <TH style={{ width: '55%' }}>
                                        Task
                                    </TH>

                                    <TH style={{ width: '20%' }} align='right'>
                                        Frequency
                                    </TH>

                                    <TH style={{ width: '10%' }} align='right'>
                                        Points
                                    </TH>

                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {tasks.map((task, key) => (

                                    <BodyTR
                                        key={key}
                                        className={`${taskToDelete && taskToDelete.taskName === task.taskName && 'deleting'} ${key % 2 ? 'odd' : 'even'}`}
                                    >
                                        <TableCell padding='none' style={{ position: 'relative' }}>
                                            <SmallIconButton
                                                onClick={() => setEditTask(task)}
                                                icon='edit'
                                            />

                                            <SmallIconButton
                                                onClick={e => { e.stopPropagation(); onDeleteTask(task); }}
                                                icon='delete'
                                            />
                                        </TableCell>

                                        <TableCell
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setSelectedTask(task)}
                                        >
                                            <h3>{task.taskName}</h3>
                                            <p>{task.desc}</p>

                                        </TableCell>

                                        <TableCell
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setSelectedTask(task)}
                                            align='right'
                                        >
                                            {task.frequency}
                                        </TableCell>

                                        <TableCell
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setSelectedTask(task)}
                                            align='right'
                                        >
                                            {task.points}
                                        </TableCell>

                                    </BodyTR>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TaskForm
                        onTaskCreated={onTaskCreated}
                        onClose={onTaskModalClose}
                        onTaskEdited={onTaskEdited}
                        open={showCreateTask}
                        taskToEdit={editTask}
                    />

                    <CompleteTask
                        onClose={() => setSelectedTask(undefined)}
                        task={selectedTask}
                        onCompleteTask={task => onCompleteTask(task, userContext.userName)}
                    />

                    <ConfirmDialog
                        open={confirmingDelete}
                        onClose={() => setConfirmingDelete(false)}
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
            color: white;
            &.even {
                background-color: ${theme.palette.primary.light};
            }
        `}


        &.odd {
            background-color: white;
        }

        .deleting {
            opacity: 0.5;
            pointer-events: none;
        }
`;

const SmallIconButton = styled(IconButton)`
    padding: 5px;
`;

export default Tasks;
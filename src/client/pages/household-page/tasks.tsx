import React, { useState } from 'react';
import styled from 'styled-components';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import TaskForm from './edit-task';

import { deleteTask, completeTask } from '../../common/api-operations';
import { UserContext } from '../../app/user-context';
import Task from './task';

interface TasksProps {
    onTaskCompleted: (task: Task) => void;
    onTaskDeleted: (task: Task) => void;
    onTaskCreated: (task: Task) => void;
    tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks, onTaskCompleted, onTaskDeleted, onTaskCreated }: TasksProps) => {

    const [showCreateTask, setShowCreateTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState();
    const [deleting, setDeleting] = useState('');
    const [editTask, setEditTask] = useState<Task>();

    const onDeleteTask = async ({ taskName }: Task) => {
        if (confirm(
            `Are you sure you want to delete ${taskName}?\nThis action is irreversible!`)
        ) {
            setDeleting(taskName);

            const deletedTask = await deleteTask({ taskName });

            if (deletedTask) {
                setTimeout(() => {
                    setDeleting('');
                    onTaskDeleted(deletedTask);
                }, 500);

            }
        }
    };

    const onCompleteTask = async (taskToComplete: Task, userName: string) => {
        const completed = await completeTask({ taskName: taskToComplete.taskName, userName });

        if (completed) {
            onTaskCompleted(taskToComplete);
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

                    <TasksContainer>
                        <Table stickyHeader size='small'>
                            <TableHead>
                                <TableRow>
                                    <TasksHeaderCell colSpan={2}>Task</TasksHeaderCell>
                                    <TasksHeaderCell align='right'>Frequency</TasksHeaderCell>
                                    <TasksHeaderCell align='right'>Points</TasksHeaderCell>
                                    <TasksHeaderCell align='right' >
                                        <IconButton
                                            onClick={() => setShowCreateTask(true)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </TasksHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.map((task, key) => (
                                    <TaskRow
                                        hover
                                        key={key}
                                        className={`${deleting === task.taskName && 'deleting'}`}
                                    >
                                        <Cell>
                                            <IconButton
                                                onClick={() => setEditTask(task)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Cell>
                                        <Cell
                                            onClick={() => setSelectedTask(task)}
                                        >{task.taskName}</Cell>
                                        <Cell align='right'>{task.frequency}</Cell>
                                        <Cell align='right'>{task.points}</Cell>
                                        <Cell align='right'>
                                            <IconButton
                                                onClick={e => { e.stopPropagation(); onDeleteTask(task); }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Cell>
                                    </TaskRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TasksContainer>

                    <TaskForm
                        onTaskCreated={onTaskCreated}
                        onClose={onTaskModalClose}
                        onTaskEdited={tte => tte}
                        open={showCreateTask}
                        editTask={editTask}
                    />

                    <Task
                        open={selectedTask !== undefined}
                        onClose={() => setSelectedTask(undefined)}
                        task={selectedTask}
                        onCompleteTask={task => onCompleteTask(task, userContext.userName)}
                    />
                </>
            }
        </UserContext.Consumer>
    );
};

const TasksContainer = styled(TableContainer)`
    && {
        background: rgba(255,255,255,0.85);
        width: 80%;
        max-width: 70vw;
    }
`;

const TasksHeaderCell = styled(TableCell)`
    && {
        background-color: #9c27b0;
        color: white;
        font-size: large;

        svg {
            color: white;
        }
    }
`;

const TaskRow = styled(TableRow)`
    && {

            height: 0px;
        &.deleting {
            transition: height 0.5s linear;
        }
    }
`;

const Cell = styled(TableCell)`
    && {
        height: 0px;
    }
`;

export default Tasks;
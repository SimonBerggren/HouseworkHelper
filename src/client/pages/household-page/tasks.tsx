import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import styled from 'styled-components';

import CreateTaskForm from './create-task-form';

import { deleteTask, completeTask } from '../../common/api-operations';
import { getUserName } from '../../common/user/authentication';
import { UserContext } from '../../app/user-context';

interface TasksProps {
    onTaskCompleted: (task: Task) => void;
    onTaskDeleted: (task: Task) => void;
    onTaskCreated: (task: Task) => void;
    tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks, onTaskCompleted, onTaskDeleted, onTaskCreated }: TasksProps) => {

    const [showCreateTask, setShowCreateTask] = useState(false);

    const onDeleteTask = async ({ taskName }: Task) => {
        if (confirm(
            `Are you sure you want to delete ${taskName}?\nThis action is irreversible!`)
        ) {
            const deletedTask = await deleteTask({ taskName });

            if (deletedTask) {
                onTaskDeleted(deletedTask);
            }
        }
    };

    const onCompleteTask = async (taskToComplete: Task) => {
        const userName = getUserName();
        const completed = await completeTask({ taskName: taskToComplete.taskName, userName });

        if (completed) {
            onTaskCompleted(taskToComplete);
        }
    };

    return (
        <UserContext.Consumer>
            {user =>
                <>

                    <TasksContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TasksHeaderCell>Task</TasksHeaderCell>
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
                                    <TableRow
                                        hover
                                        key={key}
                                        onClick={e => console.log('click')}
                                    >
                                        <TableCell>{task.taskName}</TableCell>
                                        <TableCell align='right'>{task.frequency}</TableCell>
                                        <TableCell align='right'>{task.points}</TableCell>
                                        <TableCell align='right'>
                                            <IconButton
                                                onClick={e => {e.stopPropagation(); onDeleteTask(task)}}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TasksContainer>

                    <CreateTaskForm
                        onTaskCreated={onTaskCreated}
                        onClose={() => setShowCreateTask(false)}
                        open={showCreateTask}
                    />
                </>
            }
        </UserContext.Consumer>
    );
};

const TasksContainer = styled(TableContainer)`
    && {
        background: rgba(255,255,255,0.85);
        width: 50vw;
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

export default Tasks;
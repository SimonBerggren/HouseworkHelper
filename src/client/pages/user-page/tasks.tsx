import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';

import CompleteTaskDialog from '../household-page/complete-task-dialog';

import { completeTask, requestDoTask } from '../../common/utils/api-operations';
import { addUserPoints } from '../../common/user/user-info';

type TasksProps = {
    tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }: TasksProps) => {

    const [selectedTask, setSelectedTask] = useState<Task>();

    const onCompleteTask = async (taskToComplete: Task) => {
        const completed = await completeTask({ taskName: taskToComplete.taskName });

        if (completed) {
            addUserPoints(taskToComplete.points);

            onDialogClose();
        }
    };

    const onRequestDoTask = async (data: RequestDoTask) => {
        const requested = await requestDoTask(data);

        if (requested) {
            onDialogClose();
        }
    };

    const onDialogClose = () => {
        setSelectedTask(undefined);
    };

    return (
        <>
            <Container style={{ width: '90%' }}>
                <Table stickyHeader size='small'>
                    <TableHead>
                        <TableRow>

                            <TH>
                                Task
                            </TH>

                            <TH padding='none'>
                                Frequency
                            </TH>

                            <TH align='right'>
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
                                className={`${key % 2 ? 'odd' : 'even'}`}
                            >
                                <TableCell
                                    size='small'
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
            </Container>

            <CompleteTaskDialog
                onClose={onDialogClose}
                task={selectedTask}
                onCompleteTask={onCompleteTask}
                onRequestDoTask={onRequestDoTask}
            />
        </>
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

const Container = styled(TableContainer)`
&& {
    min-height: 250px;
}
`;

export default Tasks;
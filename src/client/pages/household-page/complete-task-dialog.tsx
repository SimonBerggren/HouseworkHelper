import React, { useState, useEffect } from 'react';

import { DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import Dialog from '../../common/components/dialog/dialog';
import RequestDoTaskDialog from './request-do-task-dialog';
import Button from '../../common/components/button';
import styled from 'styled-components';

type CompleteTaskDialogProps = {
    task?: Task;
    onClose: () => void;
    onCompleteTask: (taskToComplete: Task) => void;
    onRequestDoTask: (data: RequestDoTask) => void;
}

const CompleteTaskDialog: React.FC<CompleteTaskDialogProps> = ({ task, onClose, onCompleteTask, onRequestDoTask }: CompleteTaskDialogProps) => {

    const [requestTask, setRequestTask] = useState<Task>();

    useEffect(() => {
        if (!task) {
            setRequestTask(undefined);
        }
    }, [task]);

    const onRequestDoTaskDialogClose = () => {
        setRequestTask(undefined);
    };

    return (
        <>
            <Dialog
                size='large'
                onClose={onClose}
                title={`${task?.taskName} - ${task?.points}p`}
                open={task !== undefined}
            >
                <DialogContent dividers>

                    <DialogContentText>
                        {task?.desc ||
                            <NoDescriptionText>
                                {'No description'}
                            </NoDescriptionText>
                        }
                    </DialogContentText>

                </DialogContent>
                <SplitActions>

                    <Button
                        onClick={() => setRequestTask(task)}
                        color='primary'
                        label='Ask'
                    />


                    <Button
                        onClick={() => task && onCompleteTask(task)}
                        color='primary'
                        label='Complete'
                    />

                </SplitActions>
            </Dialog>
            <RequestDoTaskDialog
                task={requestTask}
                onClose={onRequestDoTaskDialogClose}
                onRequestDoTask={onRequestDoTask}
            />
        </>
    );
};

const NoDescriptionText = styled.span`
    font-style: italic;
`;

const SplitActions = styled(DialogActions)`
&& {
    justify-content: space-between;
}
`;

export default CompleteTaskDialog;
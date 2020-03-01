import styled from 'styled-components';
import React from 'react';

import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Dialog } from '@material-ui/core';

interface TaskProps {
    task?: Task;
    onClose: () => void;
    onCompleteTask: (taskToComplete: Task) => void;
}

const Task: React.FC<TaskProps> = ({ task, onClose, onCompleteTask }: TaskProps) => {

    return (
        <Dialog
            open={task !== undefined}
            onClose={onClose}
        >
            <DialogTitle>
                {task?.taskName || ''}
            </DialogTitle>

            <DialogContent dividers>
                <DialogContentText>
                    {task?.desc || ''}
                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <CompleteButton onClick={() => task && onCompleteTask(task)} color='primary' autoFocus>
                    Complete
                </CompleteButton>

            </DialogActions>
        </Dialog>
    );
};

const CompleteButton = styled(Button)`
    width: 15em;
`;

export default Task;
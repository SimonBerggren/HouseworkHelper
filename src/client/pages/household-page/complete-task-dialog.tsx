import React from 'react';

import { DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import Dialog from '../../common/components/dialog/dialog';
import Button from '../../common/components/button';
import styled from 'styled-components';

type CompleteTaskDialogProps = {
    task?: Task;
    onClose: () => void;
    onCompleteTask: (taskToComplete: Task) => void;
}

const CompleteTaskDialog: React.FC<CompleteTaskDialogProps> = ({ task, onClose, onCompleteTask }: CompleteTaskDialogProps) => {

    return (
        <StyledCompleteTaskDialog
            onClose={onClose}
            title={task?.taskName}
            open={task !== undefined}
        >
            <DialogContent dividers>

                <DialogContentText>
                    {task?.desc || ''}
                </DialogContentText>

            </DialogContent>
            <DialogActions>

                <Button
                    onClick={() => task && onCompleteTask(task)}
                    color='primary'
                    label='Complete'
                />

            </DialogActions>
        </StyledCompleteTaskDialog>
    );
};

const StyledCompleteTaskDialog = styled(Dialog)`
    && {
        div {
            min-width: 250px;
        }
    }
`;

export default CompleteTaskDialog;
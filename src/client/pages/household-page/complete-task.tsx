import React from 'react';

import { DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import Dialog from '../../common/components/dialog/dialog';
import Button from '../../common/components/button';

type TaskProps = {
    task?: Task;
    onClose: () => void;
    onCompleteTask: (taskToComplete: Task) => void;
}

const CompleteTask: React.FC<TaskProps> = ({ task, onClose, onCompleteTask }: TaskProps) => {

    return (
        <Dialog
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
        </Dialog>
    );
};

export default CompleteTask;
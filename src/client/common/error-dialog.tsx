import React from 'react';
import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

interface ErrorDialogProps {
    title?: string;
    messages?: string[];
    open: boolean;
    onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ open, onClose, title, messages }: ErrorDialogProps) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {title || 'Error'}
            </DialogTitle>

            <DialogContent dividers>

                {messages?.map((msg, key) =>
                    <DialogContentText key={key}>
                        {msg}
                    </DialogContentText>
                )}

            </DialogContent>
            <DialogActions>

                <Button onClick={onClose} color='primary' autoFocus>
                    Ok
                </Button>

            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;
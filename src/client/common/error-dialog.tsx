import styled from 'styled-components';
import React from 'react';

import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

interface ErrorDialogProps {
    title?: string;
    messages: string[];
    open: boolean;
    onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ open, onClose, title, messages }: ErrorDialogProps) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            color='primary'
        >
            <StyledTitle>
                {title || 'Error'}
            </StyledTitle>

            <DialogContent dividers>

                {messages.map((msg, key) =>
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

const StyledTitle = styled(DialogTitle)`
    && {
        color: #9c27b0;
    }
`;

export default ErrorDialog;
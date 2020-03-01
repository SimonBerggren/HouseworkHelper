import styled from 'styled-components';
import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

interface ConfirmDialogProps {
    title?: string;
    messages: string[],
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, messages, open, onClose, onConfirm }: ConfirmDialogProps) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}

        >
            <StyledTitle
                color='primary'
            >
                {title || 'Warning'}
            </StyledTitle>

            <DialogContent>

                {messages.map((msg, key) =>
                    <DialogContentText key={key}>
                        {msg}
                    </DialogContentText>
                )}

            </DialogContent>
            <DialogActions>

                <Button onClick={onClose} color='primary'>
                    No
                </Button>

                <Button onClick={onConfirm} color='primary' autoFocus>
                    Yes
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

export default ConfirmDialog;
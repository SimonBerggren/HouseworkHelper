import styled from 'styled-components';
import React from 'react';

import { DialogContent, DialogActions, DialogContentText } from '@material-ui/core';

import Dialog, { DialogProps as IDialogProps } from './dialog';
import Button from '../button';

type ErrorDialogProps = React.PropsWithChildren<IDialogProps> & {
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ onClose, children, ...props }: ErrorDialogProps) => {

    return (
        <Dialog
            {...props}
            title={props.title || 'Error'}
            onClose={onClose}
        >
            <DialogContent>
                <StyledContentText>
                    {children}
                </StyledContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    label='Ok'
                    variant='text'
                    onClick={onClose}
                />
            </DialogActions>
        </Dialog >
    );
};

const StyledContentText = styled(DialogContentText)`
    display: flex;
    flex-direction: column;

    && {
        line-height: 30px;
    }
`;

export default ErrorDialog;
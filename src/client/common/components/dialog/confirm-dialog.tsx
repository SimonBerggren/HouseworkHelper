import styled from 'styled-components';
import React from 'react';

import { DialogContentText, DialogContent, DialogActions } from '@material-ui/core';

import Dialog, { DialogProps as IDialogProps } from './dialog';
import Button from '../button';

type ConfirmDialogProps = React.PropsWithChildren<IDialogProps> & {
    onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ onConfirm, onClose, children, ...props }: ConfirmDialogProps) => {

    return (
        <Dialog
            {...props}
            title={props.title || 'Warning'}
            onClose={onClose}
        >
            <DialogContent>
                <StyledContentText>
                    {children}
                </StyledContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    label='No'
                    variant='text'
                    onClick={onClose}
                />

                <Button
                    label='Yes'
                    variant='text'
                    onClick={onConfirm}
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

export default ConfirmDialog;
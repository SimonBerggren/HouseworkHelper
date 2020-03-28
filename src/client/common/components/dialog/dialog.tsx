import styled, { css } from 'styled-components';
import React from 'react';

import { DialogTitle, Dialog as MaterialDialog, DialogProps as IDialogProps } from '@material-ui/core';
import IconButtonTop from '../icon-button-top';

export type DialogProps = React.PropsWithChildren<IDialogProps> & {
    title?: string;
    onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ title, children, onClose, ...props }: DialogProps) => {

    return (
        <StyledDialog
            onBackdropClick={onClose}
            color='primary'
            {...props}
        >
            <StyledTitle>
                {title}

                <StyledIconTop right
                    onClick={onClose}
                    color='primary'
                    icon='close'
                />
            </StyledTitle>
            {children}
        </StyledDialog>
    );
};

const StyledDialog = styled(MaterialDialog)`

    ${({ theme }) => css`
        a {
            color: ${theme.palette.primary.main};
        }
        
        min-width: 250px;
    `}
`;

const StyledTitle = styled(DialogTitle)`
    ${({ theme }) => css`
        color: ${theme.palette.primary.main};
    `}
`;

const StyledIconTop = styled(IconButtonTop)`
    ${({ theme }) => css`
        color: ${theme.palette.primary.main};
    `}
`;

export default Dialog;
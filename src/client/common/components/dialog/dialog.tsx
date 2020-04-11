import styled, { css } from 'styled-components';
import React from 'react';

import { DialogTitle, Dialog as MaterialDialog, DialogProps as IDialogProps } from '@material-ui/core';
import IconButtonTop from '../icon-button-top';

export type DialogProps = React.PropsWithChildren<IDialogProps> & {
    title?: string;
    size?: 'small' | 'large';
    onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ title, size, onClose, children, ...props }: DialogProps) => {

    return (
        <StyledDialog
            onBackdropClick={onClose}
            color='primary'
            className={size}
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
&& {
    ${({ theme }) => css`
        a {
            color: ${theme.palette.primary.main};
        }
        
        >div>div {
            min-width: 300px;
            min-height: 300px;
        }

        &.small {
            >div>div {
                min-width: unset;
                min-height: unset;
            }
        }

        &.large {
            >div>div {
                width: 80%;
                min-height: 300px;
            }
        }
    `}
}
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
import styled, { css } from 'styled-components';
import React from 'react';

import ForwardIcon from '@material-ui/icons/ArrowForward';
import PersonAdd from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import { IconButton as MaterialIconButton, IconButtonProps as IIconButtonProps } from '@material-ui/core';

export type IconButtonProps = React.PropsWithChildren<IIconButtonProps> & {
    icon?: string;
    color?: string;
    iconSize?: 'small' | 'medium' | 'large';
}

const IconButton: React.FC<IconButtonProps> = ({ iconSize, icon, children, ...props }: IconButtonProps) => {

    const getIcon = () => {
        switch (icon) {
        case 'forward': return <ForwardIcon />;
        case 'delete': return <DeleteIcon />;
        case 'addUser': return <PersonAdd />;
        case 'check': return <CheckIcon />;
        case 'close': return <CloseIcon />;
        case 'menu': return <MenuIcon />;
        case 'edit': return <EditIcon />;
        case 'add': return <AddIcon />;
        default: return children;
        }
    };

    const getSize = () => {
        switch (iconSize) {
        case 'small':
        case 'medium': return iconSize;
        case 'large':
        default: return undefined;
        }
    };

    return (
        <StyledIconButton
            size={getSize()}
            {...props}
            className={`${iconSize} ${props.className}`}
        >
            {getIcon()}
        </StyledIconButton>
    );
};

const StyledIconButton = styled(MaterialIconButton) <IconButtonProps>`
    ${({ color }) => css`
        && {
            color: ${!color && 'white'};
            opacity: 0.6;
            
            &.large {
                transform: scale(1.5);
            }
        }
    `}
`;

export default IconButton;
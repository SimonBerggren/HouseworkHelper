import styled from 'styled-components';
import React from 'react';

import IconButton, { IconButtonProps } from './icon-button';

type IconButtonTopProps = IconButtonProps & {
    left?: boolean;
    right?: boolean;
}

const IconButtonTop: React.FC<IconButtonTopProps> = ({ left, right, ...props }: IconButtonTopProps) => {
    return (
        <StyledIconButton
            {...props}
            className={`${left && 'left'} ${right && 'right'}`}
        />
    );
};

const StyledIconButton = styled(IconButton)`
    && { 
        position: absolute;
        top: 0;

        &.left {
            left: 0;
        }

        &.right {
            right: 0;
        }
    }
        
`;

export default IconButtonTop;
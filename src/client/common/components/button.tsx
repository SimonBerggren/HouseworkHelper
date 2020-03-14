import styled, { css } from 'styled-components';
import React from 'react';

import { Button as MaterialButton, ButtonProps as IButtonProps } from '@material-ui/core';
import { boxShadowLight, boxShadowNone } from '../../style/mixins';

type ButtonProps = IButtonProps & {
    label: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {

    return (
        <StyledButton
            variant='contained'
            color='primary'
            size='large'
            {...props}
        >
            {props.label}
        </StyledButton>
    );
};

const StyledButton = styled(MaterialButton)`
    && {
        ${({ theme, variant }) => css`
            background: ${theme.primary};

            transition: box-shadow 0.3s ease-in-out;

            &:hover {
                background: ${theme.buttonHover};
            }

            ${variant !== 'text' && css`
                ${boxShadowLight}
                &:focus {
                    transition: box-shadow 0.3s ease-in-out;
                    ${boxShadowNone}
                }
            `}
        `}
    }
`;

export default Button;
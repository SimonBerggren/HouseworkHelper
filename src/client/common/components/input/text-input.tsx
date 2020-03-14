import styled, { css } from 'styled-components';
import React from 'react';

import { TextField, TextFieldProps as ITextFieldProps, IconButtonProps as IIconButtonProps } from '@material-ui/core';

export type TextInputProps = React.PropsWithChildren<ITextFieldProps> & {

};

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {

    const selectAllOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.currentTarget.select();
    };

    return (
        <StyledTextField
            onFocus={selectAllOnFocus}
            variant='outlined'
            {...props}
        />
    );
};

const StyledTextField = styled(TextField)`
    && {
        ${({ theme }) => css`

            .Mui-focused {
                color: ${theme.primary};

                fieldset {
                    border-color: ${theme.primary};
                }
            }      
        `} 
    }
`;

export default TextInput;
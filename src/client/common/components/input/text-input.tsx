import styled from 'styled-components';
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
            margin='normal'
            variant='outlined'
            type='text'
            {...props}
        />
    );
};

const StyledTextField = styled(TextField)`
`;

export default TextInput;
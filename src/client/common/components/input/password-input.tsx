import React, { useState } from 'react';

import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import InputAdornment from '@material-ui/core/InputAdornment';

import TextInput, { TextInputProps as ITextInputProps } from './text-input';

type PasswordInputProps = ITextInputProps & {
    disableEndAdornment?: boolean;
};

const PasswordInput: React.FC<PasswordInputProps> = ({ disableEndAdornment, ...props }: PasswordInputProps) => {

    const [isMasked, setIsMasked] = useState(true);

    const toggleMask = () => {
        setIsMasked(!isMasked);
    };

    return (
        <TextInput
            type={isMasked ? 'password' : 'text'}
            InputProps={{
                endAdornment: !disableEndAdornment && (
                    <InputAdornment position='end'>
                        <RemoveRedEye onClick={toggleMask} />
                    </InputAdornment>
                )
            }}
            {...props}
        />
    );
};

export default PasswordInput;
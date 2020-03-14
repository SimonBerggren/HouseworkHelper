import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import PasswordInput from '../../common/components/input/password-input';
import TextInput from '../../common/components/input/text-input';
import Form from '../../common/components/form/form';
import Button from '../../common/components/button';
import Link from '../../common/components/link';

type LoginFormProps = {
    onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }: LoginFormProps) => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <Form
            title='Login'
            onSubmit={() => onLogin(email, password)}
        >
            <TextInput
                required
                label='Email'
                type='email'
                onChange={event => setEmail(event.currentTarget.value)}
            />

            <PasswordInput
                required
                label='Password'
                type='password'
                disableEndAdornment
                onChange={event => setPassword(event.currentTarget.value)}
            />

            <Button
                label='Login'
                type='submit'
            />

            <SignupArea>
                {'Not a Helper yet?'} <Link to='/signup'>{'Sign Up Here!'}</Link>
            </SignupArea>
        </Form>
    );
};

const SignupArea = styled.div`
    && { 
        ${({ theme }) => css`
            align-self: flex-start;
            a {
                color: ${theme.palette.primary.main};
                font-weight: bold;
            }
        `}
    }
`;

export default LoginForm as any;
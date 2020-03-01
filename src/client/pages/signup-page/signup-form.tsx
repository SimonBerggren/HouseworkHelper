import React, { useState } from 'react';
import styled from 'styled-components';

import { TextField, Button } from '@material-ui/core';

import { flexCenter } from '../../style/mixins';

interface SignupFormProps {
    onSignup: (household: Household) => void;
}

const defaultFormData: SignupModel = {
    householdName: 'Home',
    email: '',
    password: '',
    confirmedPassword: ''
};

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }: SignupFormProps) => {

    const [data, setData] = useState<SignupModel>(defaultFormData);

    const onDataChange = (event: React.ChangeEvent<HTMLInputElement>, property: string) => {
        setData({ ...data, [property]: event.currentTarget.value });
    };

    return (
        <FieldSet>
            <Title>
                Sign Up to become a Helper!
            </Title>

            <br />

            <InputField
                value={data.householdName}
                label='Household name'
                variant='outlined'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDataChange(e, 'householdName')}
                required
            />

            <br />

            <InputField
                type='email'
                value={data.email}
                label='Email'
                variant='outlined'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDataChange(e, 'email')}
                required
            />

            <br />

            <InputField
                type='password'
                value={data.password}
                label='Password'
                variant='outlined'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDataChange(e, 'password')}
                required
            />

            <br />

            <SignupButton
                onClick={() => onSignup(data)}
                variant='contained'
                color='primary'
                size='large'
            >
                Sign Up
            </SignupButton>
        </FieldSet>

    );
};

const FieldSet = styled.div`
    ${flexCenter}
    margin: 0;
    padding: 2em;
    border: 0.1em solid purple;
    background: rgba(255,255,255,0.7);
    width: 30em;
`;

const Title = styled.h3`
    color: purple;
`;

const InputField = styled(TextField)`
    width: 20em;
    padding: 2em;
`;

const SignupButton = styled(Button)`
    width: 15em;
`;

export default SignupForm;
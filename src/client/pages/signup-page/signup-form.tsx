import React, { useState } from 'react';

import PasswordInput from '../../common/components/input/password-input';
import TextInput from '../../common/components/input/text-input';
import Form from '../../common/components/form/form';
import Button from '../../common/components/button';

type SignupFormProps = {
    onSignup: (household: Household) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }: SignupFormProps) => {

    const [householdName, setHouseholdName] = useState('Home');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <Form
            title='Sign Up to become a Helper!'
            onSubmit={() => onSignup({ householdName, password, email })}
        >
            <TextInput
                required
                value={householdName}
                label='Household name'
                onChange={event => setHouseholdName(event.currentTarget.value)}
            />

            <TextInput
                required
                type='email'
                value={email}
                label='Email'
                onChange={event => setEmail(event.currentTarget.value)}
            />

            <PasswordInput
                required
                value={password}
                label='Password'
                onChange={event => setPassword(event.currentTarget.value)}
            />

            <Button
                type='submit'
                label='Sign Up'
            />
        </Form >
    );
};

export default SignupForm;
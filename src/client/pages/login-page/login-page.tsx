import React, { useState } from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import Input from '../../common/input/input';
import Link from '../../common/link/link';

import { Redirect } from 'react-router-dom';
import { login } from '../../api/api';
import { authenticate } from '../../app/authentication';

const LoginPage: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const onLogin = () => {
        login(email, password)
            .then(token => {
                authenticate(token);
                setRedirect(true);
            });
    };

    return (
        <PageWrapper>

            {redirect && <Redirect to='/household' />}

            <Input type='email' autoComplete='email' onChange={e => setEmail(e.currentTarget.value)} />
            <Input type='password' autoComplete='current-password' onChange={e => setPassword(e.currentTarget.value)} />
            <Input type='submit' value='Login' onClick={onLogin} />

            <span>
                Not a Helper yet? <Link to='/signup'>Sign Up Here!</Link>
            </span>
        </PageWrapper>
    );
};

export default LoginPage;
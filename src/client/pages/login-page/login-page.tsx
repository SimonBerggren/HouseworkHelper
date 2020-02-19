import React, { useState } from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import Input from '../../common/input/input';
import Link from '../../common/link/link';

import { Redirect } from 'react-router-dom';
import { login } from '../../api/api';

const LoginPage: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const onLogin = () => {
        login(email, password)
            .then(token => {
                sessionStorage.setItem('jwtToken', token);
                setLoggedIn(true);
            });
    };

    return (
        <PageWrapper>
            {loggedIn && <Redirect to='/household' />}
            <Input type='email' autoComplete='email' onChange={e => setEmail(e.currentTarget.value)} />
            <Input type='password' autoComplete='current-password' onChange={e => setPassword(e.currentTarget.value)} />
            <Input type='submit' value='Login' onClick={onLogin} />
            <span>
                Not a Helper yet?  <Link to='/signup'>Sign Up Here!</Link>
            </span>
        </PageWrapper>
    );
};

export default LoginPage;
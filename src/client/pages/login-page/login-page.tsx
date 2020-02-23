import React, { useState } from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import Input from '../../common/input/input';
import Link from '../../common/link/link';
import SelectUser from './select-user';

import { authenticate, isLoggedIn, isAuthenticated, setUser, getEmail } from '../../app/authentication';
import { Redirect } from 'react-router-dom';
import { login } from '../../api/api';

const LoginPage: React.FC = () => {

    const [email, setEmail] = useState(getEmail());
    const [password, setPassword] = useState('');
    const [pickUser, setPickUser] = useState(isLoggedIn());
    const [redirect, setRedirect] = useState(isAuthenticated());

    const onLogin = async () => {
        const token = await login(email, password);
        authenticate(token, email);
        setPickUser(true);
    };

    const onUserPicked = (name: string) => {
        setUser(name);
        setRedirect(true);
    };

    return (
        <PageWrapper>

            {redirect ?
                <Redirect to='/household' />
                : pickUser ?
                    <SelectUser email={email} onUserPicked={onUserPicked} />
                    :
                    <>
                        <Input type='email' autoComplete='email' onChange={e => setEmail(e.currentTarget.value)} />
                        <Input type='password' autoComplete='current-password' onChange={e => setPassword(e.currentTarget.value)} />
                        <Input type='submit' value='Login' onClick={onLogin} />

                        <span>
                            Not a Helper yet? <Link to='/signup'>Sign Up Here!</Link>
                        </span>
                    </>
            }

        </PageWrapper>
    );
};

export default LoginPage;
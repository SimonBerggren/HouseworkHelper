import React, { useState } from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import Input from '../../common/input/input';
import Link from '../../common/link/link';
import SelectUser from './select-user';

import { authenticate, isAuthenticated, isFullyConfigured, setUser } from '../../app/authentication';
import { Redirect } from 'react-router-dom';
import { login } from '../../api/operations';

const LoginPage: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pickUser, setPickUser] = useState(isAuthenticated());
    const [redirect, setRedirect] = useState(isFullyConfigured());

    const onLogin = async () => {
        const token = await login(email, password);
        
        authenticate(token);
        setPickUser(true);
    };

    const onUserSelected = (userName: string) => {
        setUser(userName);
        setRedirect(true);
    };

    return (
        <PageWrapper>

            {redirect ?
                <Redirect to='/household' />
                : pickUser ?
                    <SelectUser onUserSelected={onUserSelected} />
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
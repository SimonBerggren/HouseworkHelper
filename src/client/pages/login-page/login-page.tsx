import { Redirect } from 'react-router-dom';
import React, { useState } from 'react';

import ErrorDialog from '../../common/components/dialog/error-dialog';
import PageWrapper from '../../common/utils/page-wrapper';
import Link from '../../common/components/link';
import LoginForm from './login-form';

import { authenticate, isAuthenticated } from '../../common/user/authentication';
import { login } from '../../common/utils/api-operations';

const LoginPage: React.FC = () => {

    const [showError, setShowError] = React.useState(false);
    const [loggedin, setLoggedin] = useState(isAuthenticated());
    const [loginError, setLoginError] = useState('Something went terribly wrong');

    const onLogin = async (email: string, password: string) => {

        try {
            const token = await login(email, password);

            if (!token) {
                setLoginError('Something went terribly wrong');
                return setShowError(true);
            }

            authenticate(token);
            setLoggedin(true);

        } catch (error) {
            setLoginError(error);
            setShowError(true);
        }
    };

    const onErrorClose = () => {
        setShowError(false);
    };

    return (loggedin ? <Redirect to='/users' /> :
        <PageWrapper>

            <LoginForm onLogin={onLogin} />

            <ErrorDialog
                open={showError}
                onClose={onErrorClose}
                title={loginError}
            >
                {'Forgotten your credentials? At this time, too bad!'}
                <span>
                    {'Are you new here?'}
                    <Link to='/signup' onClick={onErrorClose}>
                        {' Create an account!'}
                    </Link>
                </span>
            </ErrorDialog>

        </PageWrapper>
    );
};

export default LoginPage;
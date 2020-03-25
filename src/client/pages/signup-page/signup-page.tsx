import { Redirect } from 'react-router-dom';
import React, { useState } from 'react';

import ErrorDialog from '../../common/components/dialog/error-dialog';
import { CenterPageWrapper } from '../../common/utils/page-wrapper';
import Link from '../../common/components/link';
import SignupForm from './signup-form';

import { signup } from '../../common/utils/api-operations';

const SignupPage: React.FC = () => {

    const [showError, setShowError] = React.useState(false);
    const [signedup, setSignedup] = useState(false);
    const [signupError, setSignupError] = useState('Something went terribly wrong');

    const onSignup = async (household: Household) => {

        try {
            const signedUp = await signup(household);

            if (!signedUp) {
                setSignupError('Something went terribly wrong');
                return setShowError(true);
            }

            setSignedup(true);

        } catch (error) {
            setSignupError(error);
            setShowError(true);
        }
    };

    const onErrorClose = () => {
        setShowError(false);
    };

    return (signedup ? <Redirect to='/login' /> :
        <CenterPageWrapper>

            <SignupForm onSignup={onSignup} />

            <ErrorDialog
                open={showError}
                onClose={onErrorClose}
                title={signupError}
            >
                <span>
                    {'Already have an account?'}
                    <Link to='/login' onClick={onErrorClose}>
                        {' Login!'}
                    </Link>
                </span>
            </ErrorDialog>

        </CenterPageWrapper >
    );
};

export default SignupPage;
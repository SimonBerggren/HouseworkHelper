import React, { useState } from 'react';

import PageWrapper from '../../common/page-wrapper';
import SignupForm from './signup-form';

import { signup } from '../../common/api-operations';
import { Redirect } from 'react-router-dom';
import ErrorDialog from '../../common/error-dialog';

const SignupPage: React.FC = () => {

    const [signupError, setSignupError] = React.useState('');
    const [signedup, setSignedup] = useState(false);

    const onSignup = async (household: Household) => {

        try {
            const signedUp = await signup(household);

            if (signedUp) {
                setSignedup(true);
            } else {
                setSignupError('Couldn\'t sign up');
            }

        } catch (error) {
            setSignupError(error);
        }
    };

    const handleClose = () => {
        setSignupError('');
    };

    return (
        <PageWrapper>
            {signedup && <Redirect to='/login' />}
            <SignupForm
                onSignup={onSignup}
            />

            <ErrorDialog
                open={signupError !== ''}
                onClose={handleClose}
                messages={[signupError]}
            />

        </PageWrapper >
    );
};

export default SignupPage;
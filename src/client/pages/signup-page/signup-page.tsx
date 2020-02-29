import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';

import PageWrapper from '../../common/page-wrapper';
import SignupForm from './signup-form';

import { signup } from '../../common/api-operations';
import { Redirect } from 'react-router-dom';

const SignupPage: React.FC = () => {

    const [showError, setShowError] = React.useState(false);
    const [signedup, setSignedup] = useState(false);
    let signupError = '';

    const onSignup = async (household: Household) => {

        try {
            const signedUp = await signup(household);

            if (signedUp) {
                setSignedup(true);
            } else {
                signupError = 'Unable to sign up';
                setShowError(true);
            }

        } catch (error) {
            signupError = error;
            setShowError(true);
        }
    };

    const handleClose = () => {
        signupError = '';
        setShowError(false);
    };

    return (
        <PageWrapper>
            {signedup && <Redirect to='/login' />}
            <SignupForm
                onSignup={onSignup}
            />

            <Dialog
                open={showError}
                onClose={handleClose}
            >
                <DialogTitle>
                    Could not Sign up
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {signupError}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Try again
                    </Button>
                </DialogActions>
            </Dialog>

        </PageWrapper >
    );
};

export default SignupPage;
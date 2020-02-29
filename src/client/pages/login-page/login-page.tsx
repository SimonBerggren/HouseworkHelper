import { TextField, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';

import PageWrapper from '../../common/page-wrapper';
import Link from '../../common/link';

import { authenticate, isAuthenticated } from '../../common/user/authentication';
import { login } from '../../common/api-operations';
import { flexCenter } from '../../style/mixins';
import { Redirect } from 'react-router-dom';


const LoginPage: React.FC = () => {

    const [showInvalidCredentials, setShowInvalidCredentials] = React.useState(false);
    const [redirect, setRedirect] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onLogin = async () => {

        try {
            const token = await login(email, password);

            authenticate(token);
            setRedirect(true);

        } catch (error) {
            setShowInvalidCredentials(true)
        }
    };

    const handleClose = () => {
        setShowInvalidCredentials(false);
    };

    return (
        <PageWrapper>

            {redirect ?
                <Redirect to='/users' />
                :
                <form autoComplete='on' onSubmit={e => e.preventDefault()}>
                    <FieldSet>

                        <Title>
                            Login
                        </Title>

                        <InputField
                            label="Email"
                            variant='outlined'
                            autoFocus
                            onChange={e => setEmail(e.currentTarget.value)}
                        />

                        <br />

                        <InputField
                            label="Password"
                            type='password'
                            variant='outlined'
                            onChange={e => setPassword(e.currentTarget.value)}
                        />

                        <br />

                        <LoginButton
                            onClick={onLogin}
                            variant='contained'
                            color='primary'
                            size='large'
                        >
                            Login
                        </LoginButton>

                        <Signup>
                            Not a Helper yet? <Link to='/signup'>Sign Up Here!</Link>
                        </Signup>

                        <Dialog
                            open={showInvalidCredentials}
                            onClose={handleClose}
                        >
                            <DialogTitle children={'Invalid Credentials'} />
                            <DialogContent>
                                <DialogContentText children={'Forgotten your credentials? At this time, too bad!'} />
                                <DialogContentText>
                                    Are you new here? You are welcome to <Link to='/signup' onClick={handleClose}>Create an account!</Link>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary" autoFocus>
                                    Try again
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </FieldSet>
                </form>
            }

        </PageWrapper >
    );
};

const InputField = styled(TextField)`
            width: 20em;
            padding: 2em;
        `;

const LoginButton = styled(Button)`
            width: 15em;
        `;

const FieldSet = styled.div`
    ${flexCenter}
            margin: 0;
            padding: 2em;
            border: 0.1em solid purple;
            background: rgba(255,255,255,0.8);
            width: 30em;
        `;

const Title = styled.h1`
            color: purple;
        `;

const Signup = styled.div`
            align-self: flex-start;
            color: #000;
            margin-top: 2em;
        
    a {
                color: purple;
        }
    `

export default LoginPage;
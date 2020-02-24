
import React, { useState } from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import SignupForm from './signup-form';

import { signup } from '../../api/operations';
import { Redirect } from 'react-router-dom';

const SignupPage: React.FC = () => {

    const [signedup, setSignedup] = useState(false);

    const onFormSubmit = (household: Household) => {
        signup(household)
            .then(() => setSignedup(true))
            .catch(error => alert(error));
    };

    return (
        <PageWrapper>
            {signedup && <Redirect to='/login' />}
            <SignupForm
                onSubmit={onFormSubmit}
            />
        </PageWrapper >
    );
};


export default SignupPage;
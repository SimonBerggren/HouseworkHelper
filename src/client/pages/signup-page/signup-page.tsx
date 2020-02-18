
import React from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import SignupForm from './signup-form';
import { post } from '../../api/api';

const SignupPage: React.FC = () => {

    const onFormSubmit = (data: FormDataModel) => {
        post('/signup', data).then(response => console.log(response));
    };

    return (
        <PageWrapper>
            <SignupForm
                onSubmit={onFormSubmit}
            />
        </PageWrapper >
    );
};


export default SignupPage;
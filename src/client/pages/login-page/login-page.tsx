import React from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import Input from '../../common/input/input';

const LoginPage: React.FC = () => {

    return (
        <PageWrapper>
            <Input type='email' placeholder='Email' autoComplete='email' />
            <Input type='password' placeholder='Password' autoComplete='current-password' />
            <Input type='submit' value='Login' />
            <span>
                Not a helper yet?  <u>Sign up here!</u>
            </span>
        </PageWrapper>
    );
};

export default LoginPage;
import React from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import Input from '../../common/input/input';
import Link from '../../common/link/link';

const LoginPage: React.FC = () => {

    return (
        <PageWrapper>
            <Input type='email' placeholder='Email' autoComplete='email' />
            <Input type='password' placeholder='Password' autoComplete='current-password' />
            <Input type='submit' value='Login' />
            <span>
                Not a Helper yet?  <Link to='/signup'>Sign Up Here!</Link>
            </span>
        </PageWrapper>
    );
};

export default LoginPage;
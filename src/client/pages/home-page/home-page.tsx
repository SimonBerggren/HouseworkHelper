import React from 'react';

import PageWrapper from '../../common/page-wrapper';
import Link from '../../common/link';

import { isAuthenticated } from '../../common/user/authentication';
import { logout } from '../../common/api-operations';

const HomePage: React.FC = () => {

    return (
        <PageWrapper>
            <h1>
                HouseworkHelper
            </h1>
            <h4>
                {isAuthenticated() ?
                    <Link to='/' onClick={() => logout()}>Log out</Link>
                    :
                    <Link to='/login'>Log in</Link>
                }
            </h4>
        </PageWrapper>
    );
};

export default HomePage;
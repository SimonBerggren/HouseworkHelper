import React from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import Link from '../../common/link/link';

const HomePage: React.FC = () => {

    return (
        <PageWrapper>
            <h1>
                HouseworkHelper
            </h1>
            <h4><Link to='/login'>Login</Link></h4>
        </PageWrapper>
    );
};

export default HomePage;
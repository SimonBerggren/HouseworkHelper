import React from 'react';

import PageWrapper from '../../common/page-wrapper';

import styled from 'styled-components';

const HomePage: React.FC = () => {

    return (
        <CenterPageWrapper>
            <PageTitle>
                WE HELP YOU HELP
            </PageTitle>
        </CenterPageWrapper>
    );
};

const CenterPageWrapper = styled(PageWrapper)`
    justify-content: center;
`;

const PageTitle = styled.h1`
    font-size: 1.5em;
    letter-spacing: 0.3em;
    color: #9c27b0;
    border: 1px solid #9c27b0;
    padding: 6em;
    vertical-align: middle;
`;

export default HomePage;
import styled, { css } from 'styled-components';
import React from 'react';

import PageWrapper from '../../common/utils/page-wrapper';
import Link from '../../common/components/link';

const HomePage: React.FC = () => {

    return (
        <PageWrapper>
            <TitleLink to={'/login'}>
                <h1>{'WE HELP YOU HELP'}</h1>
            </TitleLink>
        </PageWrapper>
    );
};

const TitleLink = styled(Link)`
    ${({ theme }) => css`
        border: 1px solid ${theme.palette.primary.main};
        color: ${theme.palette.primary.main};
    `}

    margin: 25px;
    padding:  50px 25px;
    text-align: center;
    letter-spacing: 0.3em;

    cursor: pointer;
`;

export default HomePage;
import styled from 'styled-components';
import React from 'react';

import { flexCenter } from '../../app/mixins';

interface Props {
    children?: React.ReactNode;
}

const PageWrapper: React.FC = ({ children }: Props) => {

    return (
        <StyledPageWrapper>
            {children}
        </StyledPageWrapper>
    );
};

const StyledPageWrapper = styled.div`
    width: 100vw;
    height: 100vh;

    ${flexCenter}
`;

export default PageWrapper;
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

    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    animation: fadeIn 300ms;
`;

export default PageWrapper;
import styled from 'styled-components';
import React from 'react';

import { flexCenter } from '../style/mixins';

interface PageWrapperProps {
    children?: React.ReactNode;
    className?: string;
}

const PageWrapper: React.FC = ({ children, className }: PageWrapperProps) => {

    return (
        <StyledPageWrapper className={className}>
            {children}
        </StyledPageWrapper>
    );
};

const StyledPageWrapper = styled.div`
    width: 100vw;
    height: 100vh;

    margin-top: 3.6em;

    ${flexCenter}

    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    animation: fadeIn 300ms;
`;

export default PageWrapper;
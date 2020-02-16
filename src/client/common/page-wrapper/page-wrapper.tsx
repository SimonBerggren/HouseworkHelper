import styled from 'styled-components';
import React from 'react';

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

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;    
`;

export default PageWrapper;
import styled from 'styled-components';
import React from 'react';

import { flexCenter } from '../../style/mixins';

type PageWrapperProps = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {

}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, ...props }: PageWrapperProps) => {

    return (
        <StyledPageWrapper {...props}>
            {children}
        </StyledPageWrapper>
    );
};

const CenterPageWrapper: React.FC<PageWrapperProps> = ({ children, ...props }: PageWrapperProps) => {

    return (
        <StyledCenterPageWrapper {...props}>
            {children}
        </StyledCenterPageWrapper>
    );
};

const StyledPageWrapper = styled.div`
    ${flexCenter}
    justify-content: flex-start;
    width: 100vw;
    height: calc(100vh - 64px);
`;

const StyledCenterPageWrapper = styled(StyledPageWrapper)`
    justify-content: center;
`;

export { PageWrapper, CenterPageWrapper };
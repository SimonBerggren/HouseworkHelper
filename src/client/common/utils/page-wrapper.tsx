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

const StyledPageWrapper = styled.div`
    ${flexCenter}
    width: 100vw;
    height: calc(100vh - 64px);
`;

export default PageWrapper;
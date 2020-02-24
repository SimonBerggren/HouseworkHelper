import styled from 'styled-components';
import React from 'react';

import { Link as RouterLink, LinkProps as ILinkProps } from 'react-router-dom';

interface Props extends ILinkProps {
}

const Link: React.FC<Props> = ({ ...props }: Props) => {

    return (
        <StyledLink>
            <RouterLink
                {...props}
            />
        </StyledLink>
    );
};

const StyledLink = styled.span`
    a {
        color: inherit;
    }
`;

export default Link;
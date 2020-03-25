import styled from 'styled-components';
import React from 'react';

import { Link as RouterLink, LinkProps as ILinkProps } from 'react-router-dom';

type LinkProps = ILinkProps & React.PropsWithChildren<{}> & {
    label?: string;
};

const Link: React.FC<LinkProps> = ({ label, children, ...props }: LinkProps) => {

    return (
        <StyledLink
            {...props}
        >
            {label ? label : children}
        </StyledLink>
    );
};

const StyledLink = styled(RouterLink) <LinkProps>`
    text-decoration: none;
    color: white;    
`;

export default Link;
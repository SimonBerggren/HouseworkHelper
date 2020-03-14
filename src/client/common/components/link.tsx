import styled from 'styled-components';
import React from 'react';

import { Link as RouterLink, LinkProps as ILinkProps } from 'react-router-dom';

type LinkProps = ILinkProps & React.PropsWithChildren<{}> & {

};

const Link: React.FC<LinkProps> = (props: LinkProps) => {

    return (
        <StyledLink
            {...props}
        />
    );
};

const StyledLink = styled(RouterLink)<LinkProps>`
    text-decoration: none;
    color: white;    
`;

export default Link;
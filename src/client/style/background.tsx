import styled from 'styled-components';
import React from 'react';

import background from './images/background.png';

const Background = () => {
    return (
        <StyledBackground src={background} className={location.pathname == '/' ? 'normal' : 'normal'} />
    );
};

const StyledBackground = styled.img`

    &.blur {
        filter: blur(8px);
        -webkit-filter: blur(8px);
    }

    background-color: white;
    object-fit: cover;

    position: fixed;
    z-index: -10;

    width: 100vw;
    height: 100vh;
`;

export default Background;
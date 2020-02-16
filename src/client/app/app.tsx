import AnimatedSwitch from './animated-switch';
import GlobalStyle from './global-style';
import styled from 'styled-components';
import React from 'react';

import { BrowserRouter } from 'react-router-dom';

const App = () => {

    return (
        <BrowserRouter>
            <StyledApp>
                <GlobalStyle />
                <AnimatedSwitch />
            </StyledApp>
        </BrowserRouter>
    );
};

const StyledApp = styled.div`
    width: 100vw;
    height: 100vh;
    background: black;
`;

export default App;
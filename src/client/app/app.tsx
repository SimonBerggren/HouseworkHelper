import React, { Suspense } from 'react';
import styled from 'styled-components';

import { BrowserRouter } from 'react-router-dom';

import LoadingPage from '../pages/loading-page';
import AnimatedSwitch from './animated-switch';
import GlobalStyle from './global-style';

const App = () =>
    <Suspense fallback={<LoadingPage />}>
        <BrowserRouter>
            <StyledApp>
                <GlobalStyle />
                <AnimatedSwitch />
            </StyledApp>
        </BrowserRouter>
    </Suspense>;

const StyledApp = styled.div`
    width: 100vw;
    height: 100vh;
`;

export default App;
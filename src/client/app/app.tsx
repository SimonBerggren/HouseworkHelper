import React, { Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';

import UserContextProvider from './user-context';
import GlobalStyle from '../style/global-style';
import AnimatedSwitch from './animated-switch';
import Background from '../style/background';
import ThemeProvider from '../style/theme';
import MenuBar from './menu-bar';

const App = () => {
    return (
        <ThemeProvider>
            <Suspense fallback={<></>}>
                <BrowserRouter>
                    <UserContextProvider>
                        <GlobalStyle />
                        <Background />
                        <MenuBar />
                        <AnimatedSwitch />
                    </UserContextProvider>
                </BrowserRouter>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
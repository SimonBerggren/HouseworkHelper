import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import UserContextProvider from './user-context';
import GlobalStyle from '../style/global-style';
import AnimatedSwitch from './animated-switch';
import Background from '../style/background';
import ThemeProvider from '../style/theme';
import MenuBar from './menu-bar';

const App = () => {
    return (
        <BrowserRouter>

            <ThemeProvider>
                <UserContextProvider>

                    <GlobalStyle />
                    <Background />
                    <MenuBar />
                    <AnimatedSwitch />

                </UserContextProvider>
            </ThemeProvider>

        </BrowserRouter>
    );
};

export default App;
import React, { Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';

import LoadingPage from '../pages/loading-page/loading-page';
import GlobalStyle from '../style/global-style';
import AnimatedSwitch from './animated-switch';
import Background from '../style/background';
import MenuBar from '../common/menu-bar';
import UserContextProvider from './user-context';
import ThemeProvider from '../style/theme';

const App = () => {
    return (
        <ThemeProvider>
            <Suspense fallback={<LoadingPage />}>
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
}

export default App;
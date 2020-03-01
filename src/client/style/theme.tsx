import React from 'react';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const defaultTheme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: {
            main: '#8e24aa',
        },
    },
});

const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }: React.PropsWithChildren<{}>) => {

    return (
        <MuiThemeProvider theme={defaultTheme}>
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
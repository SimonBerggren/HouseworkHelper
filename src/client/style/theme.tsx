import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import React from 'react';

const defaultTheme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: {
            main: '#8e24aa',
        },
    },
});

const ThemeProvider: React.FC = ({ children }) => {

    return (
        <MuiThemeProvider theme={defaultTheme}>
            {children}
        </MuiThemeProvider>
    )
};

export default ThemeProvider;
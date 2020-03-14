import React from 'react';

import { purple } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

type ThemeProviderProps = React.PropsWithChildren<{}> & {

}

const defaultTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: purple,
        secondary: purple,
    }
});

const TShemeProvider: React.FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {

    return (
        <MuiThemeProvider theme={defaultTheme}>
            <ThemeProvider theme={defaultTheme}>
                {children}
            </ThemeProvider>
        </MuiThemeProvider>
    );
};

export default TShemeProvider;
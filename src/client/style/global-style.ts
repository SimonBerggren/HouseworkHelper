import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-size: 1.1em;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: #01579b;
        
        background: #000;

        padding: 0;
        margin: 0;

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`;

export default GlobalStyle;
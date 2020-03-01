import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-size: 1.1em;
        font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

        padding: 0;
        margin: 0;

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        @keyframes scaleup {
            0% {
                width: 0em;
                height: 0em;
                border-width: 0px;
                opacity: 0;
                margin: 0em;
            }
            50% {
                height: 7em;
                width: 0em;
                border-width: 0px;
                opacity: 0;
                margin: 0em;
            }
            100% {
                opacity: 1;
                border-width: 1px;
                width: 7em;
                margin: 0.5em;
            }
        }
    }
`;

export default GlobalStyle;
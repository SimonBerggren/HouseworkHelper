import styled from 'styled-components';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input: React.FC<InputProps> = ({ ...props }: InputProps) => {

    return (
        <StyledInput
            {...props}
        />
    );
};

const StyledInput = styled.input`

    /* hide default style */

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        transition: "color 9999s ease-out, background-color 9999s ease-out";
        transition-delay: 9999s;
        -webkit-text-fill-color: #01579b;
        box-shadow: 0 0 0px 1000px #000 inset;
    }

    &[type=number] {
        -moz-appearance: textfield;
    }

    width: 20vw;

    text-align: center;
    font-size: 1.15em;

    background: black;
    color: #01579b;

    border: none;
    border-bottom: 0.1em solid #01579b;

    outline: none;

    margin: 2vh;
    padding: 1vh;

    :focus {
        color: #90caf9;
        border-color: #90caf9;

        ::placeholder {
            color: #90caf9;
        }
    }

    /* type overries */
    &[type=button],
    &[type=submit] {
        border: 0.1em solid #01579b;
        cursor: pointer;
        color: #01579b;
    }
    
    :hover {
        border-color: #2196f3;

        ::placeholder {
            color: #2196f3;
        }   
    }

    
`;

export default Input;
import styled from 'styled-components';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input: React.FC<InputProps> = ({ className, ...props }: InputProps) => {

    return (
        <StyledInput
            className={className}
            {...props}
        />
    );
};

const StyledInput = styled.input`

    /* hide default style */

    &[type=number] {
        -moz-appearance: textfield;
    }

    width: 30vw;

    text-align: center;
    font-size: 1em;

    background: white;
    color: #01579b;

    border: 0.1em solid #01579b;

    outline: none;

    margin: 2vh;
    padding: 1vh;

    &:focus {
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
    
    &:hover {
        border-color: #2196f3;

        ::placeholder {
            color: #2196f3;
        }   
    }
`;

export default Input;
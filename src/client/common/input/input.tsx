import styled from 'styled-components';
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input: React.FC<Props> = ({ ...props }: Props) => {

    return (
        <StyledInput
            {...props}
        />
    );
};

const StyledInput = styled.input`

    width: 20em;

    &[type=button],
    &[type=submit] {
        width: 15em;
    }

    height: 2em;

    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
    line-height: 1.2em;

    background: none;
    color: #01579b;

    border: 0.1em solid #01579b;
    border-radius: 1em;
    cursor: default;
    outline: none;

    margin: 1em;
    padding: 0.2em;

    transition: border 0.5s linear;

    ::placeholder {
        color: #01579b;
    }

    :hover {
        border-color: #2196f3;
        transition: border 0.5s linear;

        ::placeholder {
            color: #2196f3;
            transition: color 0.5s linear;
        }   
    }
    
    :focus {
        color: #90caf9;
        border-color: #90caf9;
        transition: border 0.5s linear;

        ::placeholder {
            color: #90caf9;
            transition: color 0.5s linear;
        }
    }
`;

export default Input;
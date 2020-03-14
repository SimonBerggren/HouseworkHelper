import styled, { css } from 'styled-components';
import React from 'react';

import { flexCenter, boxShadow } from '../../../style/mixins';

type FormProps = React.DOMAttributes<HTMLFormElement> & {
    title: string;
}

const Form: React.FC<FormProps> = ({ title, onSubmit, children }: FormProps) => {

    const preventDefaultAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit && onSubmit(e);
    };

    return (
        <StyledForm onSubmit={preventDefaultAndSubmit} >

            <h1>{title}</h1>

            {children}

        </StyledForm>
    );
};

const StyledForm = styled.form`
    ${flexCenter}
    justify-content: space-between;

    height: 350px;
    width: 250px;

    padding: 2em;

    border-radius: 10px;

    ${({ theme }) => css`

        background-color: white;

        border: 2px solid ${theme.palette.primary.main};
        ${boxShadow}

        h1 {
            color: ${theme.palette.primary.main}
        }
    `};
`;

export default Form;
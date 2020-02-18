import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../../common/input/input';
import { flexCenter } from '../../app/mixins';

interface Props {
    onSubmit: (data: FormDataModel) => void;
}

const defaultFormData: FormDataModel = {
    householdName: 'Home',
    householdHelper: '',
    email: '',
    password: '',
    confirmedPassword: ''
};

const selectTextOnFocus = (event: React.FocusEvent<HTMLInputElement>) => event.currentTarget.select();

const SignupForm: React.FC<Props> = ({ onSubmit }: Props) => {

    const [data, setData] = useState<FormDataModel>(defaultFormData);


    const formDataTextChange = (event: React.ChangeEvent<HTMLInputElement>, property: string) => {
        setData({ ...data, [property]: event.currentTarget.value });
    };

    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(data);
        }}>
            <FieldSet>
                <Legend>
                    Sign Up to become a Helper!
                </Legend>

                <Field>
                    <Label>
                        Do you want to name your household anything?
                    </Label>

                    <Input
                        type='text'
                        value={data.householdName}
                        onFocus={selectTextOnFocus}
                        onChange={e => formDataTextChange(e, 'householdName')}
                        required
                    />
                </Field>

                <Field>
                    <Label>
                        Your Name:
                    </Label>

                    <Input
                        type='text'
                        autoComplete='given-name'
                        value={data.householdHelper}
                        onFocus={selectTextOnFocus}
                        onChange={e => formDataTextChange(e, 'householdHelper')}
                        required
                    />
                </Field>

                <Field>
                    <Label>
                        Email:
                    </Label>

                    <Input
                        type='email'
                        autoComplete='email'
                        value={data.email}
                        onFocus={selectTextOnFocus}
                        onChange={e => formDataTextChange(e, 'email')}
                        required
                    />
                </Field>

                <Field>
                    <Label>
                        Password:
                    </Label>

                    <Input
                        type='password'
                        autoComplete='new-password'
                        value={data.password}
                        onFocus={selectTextOnFocus}
                        onChange={e => formDataTextChange(e, 'password')}
                        required
                    />
                </Field>

                <Field>
                    <Label>Confirm Password:</Label>

                    <Input
                        type='password'
                        autoComplete='new-password'
                        value={data.confirmedPassword}
                        onFocus={selectTextOnFocus}
                        onChange={e => formDataTextChange(e, 'confirmedPassword')}
                        required
                    />
                </Field>

            </FieldSet>

            <Input
                type='submit'
                value='Sign Up'
            />

        </Form>
    );
};

const Form = styled.form`
    ${flexCenter}
    width: 80vw;
`;

const FieldSet = styled.fieldset`
    ${flexCenter}
    margin: 1em;
    border: 0.1em solid #2196f3;
`;

const Legend = styled.legend`
    color: #2196f3;
    font-size: 1.3em;
`;

const Field = styled.p`
    ${flexCenter}
    align-items: center;
    margin-top: 4em;
    padding-bottom: 4em;
    width: 100%;
`;

const Label = styled.label`
    font-size: 1.2em;
    align-self: flex-start;
`;

export default SignupForm;
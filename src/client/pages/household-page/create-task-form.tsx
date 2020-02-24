import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../../common/input';

import { frequencies } from '../../../common/frequencies';
import { createTask } from '../../common/api-operations';
import { flexCenter } from '../../style/mixins';

interface CreateTaskProps {
    onTaskCreated: (taskToCreate: Task) => void;
}

const CreateTaskForm: React.FC<CreateTaskProps> = ({ onTaskCreated }: CreateTaskProps) => {

    const [taskName, setTaskName] = useState<string>('');
    const [desc, setDesc] = useState<string>();
    const [frequency, setFrequency] = useState<string>('');
    const [points, setPoints] = useState<number>(0);

    const onCreateTask = async (taskToCreate: Task) => {
        const createdTask = await createTask(taskToCreate);

        if (createdTask) {
            onTaskCreated(createdTask);
        }
    };

    return (
        <Form onSubmit={e => e.preventDefault()}>
            <FieldSet>
                <Legend>Create new task</Legend>

                <Field>
                    <Label>Title</Label>

                    <Input type='text' onChange={e => setTaskName(e.currentTarget.value)} />
                </Field>



                <Field>
                    <Label>Description</Label>

                    <DescriptionBox onChange={e => setDesc(e.currentTarget.value)} />
                </Field>

                <Field>
                    <Label>Rewards points</Label>

                    <Input type='number' defaultValue={points} onChange={e => setPoints(parseInt(e.currentTarget.value))} />
                </Field>


                <Field>
                    <Label>Frequency</Label>

                    <Dropdown onChange={e => setFrequency(e.currentTarget.value)}>
                        <option style={{ display: 'none' }} ></option>

                        {frequencies.map((frequency, key) =>
                            <option
                                key={key}
                                value={frequency}
                            >
                                {frequency}
                            </option>
                        )}
                    </Dropdown>
                </Field>

                <Input type='button' value='Create new task' onClick={() => onCreateTask({ frequency, points, taskName, desc })} />

            </FieldSet>
        </Form>
    );
};

const Dropdown = styled.select`
    background: black;
    color: #01579b;
    border: 0.1em solid #01579b;
    font-size: 1.15em;
    width: 15vw;
    
    :focus {
        border: 0.1em solid #01579b;
    }
`;

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

const DescriptionBox = styled.textarea`
    background: black;
    color: #01579b;
    border: 0.1em solid #01579b;
    font-size: 1.4em;
    width: 30vw;
    height: 10vw;
    resize: none;
`;

export default CreateTaskForm;
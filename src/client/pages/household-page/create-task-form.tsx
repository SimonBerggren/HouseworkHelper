import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import styled from 'styled-components';

import { frequencies } from '../../../common/frequencies';
import { createTask } from '../../common/api-operations';

interface CreateTaskProps {
    onTaskCreated: (taskToCreate: Task) => void;
    onClose: () => void;
    open: boolean;
}

const CreateTaskForm: React.FC<CreateTaskProps> = ({ open, onClose, onTaskCreated }: CreateTaskProps) => {

    const [taskName, setTaskName] = useState<string>('');
    const [desc, setDesc] = useState<string>();
    const [frequency, setFrequency] = useState<string>('');
    const [points, setPoints] = useState<number>(0);

    const onCreateTask = async (taskToCreate: Task) => {
        const createdTask = await createTask(taskToCreate);

        if (createdTask) {
            onTaskCreated(createdTask);
            onClose();
        }
    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
        >
            <Title>
                Create New Task

                <CloseButton
                    onClick={onClose}
                >
                    <CloseIcon />
                </CloseButton>
            </Title>
            <DialogContent dividers>

                <InputField
                    label="Title"
                    onChange={(e) => setTaskName(e.currentTarget.value)}
                    required
                />

                <InputField
                    label="Description"
                    onChange={(e) => setDesc(e.currentTarget.value)}
                    multiline
                />

                <InputField
                    type='number'
                    label='Reward Points'
                    onChange={(e) => setPoints(parseInt(e.currentTarget.value))}
                    required
                />

                <SelectField>
                    <InputLabel required >Frequency</InputLabel>

                    <Select
                        value={frequency}
                        onChange={e => setFrequency(e.target.value as string)}
                    >
                        {frequencies.map((frequency, key) =>
                            <MenuItem
                                key={key}
                                value={frequency}
                            >
                                {frequency}
                            </MenuItem>
                        )}
                    </Select>

                    <FormHelperText>Select how frequent this task needs to be perfomed</FormHelperText>
                </SelectField>

            </DialogContent>
            <DialogActions >
                <SignupButton
                    onClick={() => onCreateTask({ frequency, points, taskName, desc })}
                    color="primary"
                    variant='contained'
                >
                    Create Task
                    </SignupButton>
            </DialogActions>
        </Dialog>
    );
};

const Title = styled(DialogTitle)`
    color: purple;
`;

const CloseButton = styled(IconButton)`
    && { 
        position: absolute;
        top: 0.3em;
        right: 0.3em;
    }
`;

const InputField = styled(TextField)`
    width: 20em;
`;

const SelectField = styled(FormControl)`
    width: 20em;
`;

const SignupButton = styled(Button)`
    width: 15em;
`;

export default CreateTaskForm;
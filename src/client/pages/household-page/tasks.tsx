import React from 'react';

import { deleteTask, completeTask } from '../../common/api-operations';
import { getUserName } from '../../common/user/authentication';
import { flexCenter } from '../../style/mixins';
import styled from 'styled-components';
import Input from '../../common/input';

interface TasksProps {
    onTaskCompleted: (task: Task) => void;
    onTaskDeleted: (task: Task) => void;
    tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks, onTaskCompleted, onTaskDeleted }: TasksProps) => {

    const stopPropagationAndDelete = async (event: React.MouseEvent, { taskName }: Task) => {
        event.stopPropagation();

        if (confirm(
            `Are you sure you want to delete ${taskName}?\nThis action is irreversible!`)
        ) {
            const deletedTask = await deleteTask({ taskName });

            if (deletedTask) {
                onTaskDeleted(deletedTask);
            }
        }
    };

    const stopPropagationAndComplete = async (event: React.MouseEvent, taskToComplete: Task) => {
        event.stopPropagation();

        const userName = getUserName();
        const completed = await completeTask({ taskName: taskToComplete.taskName, userName });

        if (completed) {
            onTaskCompleted(taskToComplete);
        }
    };

    const onViewTask = () => {

    };

    return (
        <Form onSubmit={e => e.preventDefault()}>
            <FieldSet>

                <Legend>Existing Tasks</Legend>

                {tasks.length > 0 && tasks.map((task, key) =>

                    <Task
                        key={key}
                        onClick={() => onViewTask}
                    >
                        <h3>{task.taskName}</h3>

                        <DeleteButton
                            onClick={e => stopPropagationAndComplete(e, task)}
                        >
                            Complete Task
                        </DeleteButton>

                        <DeleteButton
                            onClick={e => stopPropagationAndDelete(e, task)}
                        >
                            x
                        </DeleteButton>
                    </Task>
                )}
            </FieldSet>
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
    padding: 1.5em;
    border: 0.1em solid #2196f3;
    width: 50vw;
`;

const Legend = styled.legend`
    color: #2196f3;
    font-size: 1.3em;
`;

const Task = styled.div`
    display: flex;
    justify-content: space-between;
    border: 0.1em solid transparent;
    padding: 0.5em;
    margin-top: 1em;

    :hover {
        border: 0.1em solid #2196f3;
    }
`;

const DeleteButton = styled.button`
    background: black;
    border: none;
    color: #01579b;
    font-size: 1.3em;

    :hover {
        color: #2196f3;
    }
`;

export default Tasks;
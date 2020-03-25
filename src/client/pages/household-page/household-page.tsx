import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { PageWrapper } from '../../common/utils/page-wrapper';
import Users from './users';
import Tasks from './tasks';

import { getHousehold, getTasks, getUsers } from '../../common/utils/api-operations';

const HouseholdPage: React.FC = () => {

    const [household, setHousehold] = useState<Household>();
    const [users, setUsers] = useState<User[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getHousehold()
            .then(household => setHousehold(household));

        getUsers()
            .then(users => setUsers(users));

        getTasks()
            .then(tasks => setTasks(tasks));
    }, []);

    const onTaskCreated = (createdTask: Task) => {
        const newTasks = tasks.concat(createdTask);
        setTasks(newTasks);
    };

    const onTaskEdited = (oldTask: Task, updatedTask: Task) => {
        const indexOfOldTask = tasks.findIndex(task => task.taskName === oldTask.taskName);
        if (indexOfOldTask !== -1) {
            const copy = [...tasks];
            copy.splice(indexOfOldTask, 1, updatedTask);
            setTasks(copy);
        }
    };

    const onTaskDeleted = ({ taskName }: Task) => {
        const filteredTasks = tasks.filter(task => task.taskName !== taskName);
        setTasks(filteredTasks);
    };

    return (

        <PageWrapper>

            {household && <>

                <h2>{household.householdName}</h2>
                <br />

                <Users
                    users={users}
                />

                <br />

                <TasksTitle >{'All household tasks'}</TasksTitle >

                <Tasks
                    onTaskDeleted={onTaskDeleted}
                    onTaskCreated={onTaskCreated}
                    onTaskEdited={onTaskEdited}
                    tasks={tasks}
                />

            </>}

        </PageWrapper>
    );
};

const TasksTitle = styled.h4`
    background: rgba(255, 255, 255, 0.7);
    width: calc(90% - 20px);
    padding: 10px;
`;

export default HouseholdPage;
import React, { useEffect, useState } from 'react';

import PageWrapper from '../../common/page-wrapper';
import Link from '../../common/link';

import { getUsers, getHousehold, getTasks, logout, switchUser } from '../../common/api-operations';
import Tasks from './tasks';

const HouseholdPage: React.FC = () => {

    const [household, setHousehold] = useState<Household>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getHousehold()
            .then(household => setHousehold(household));

        getTasks()
            .then(tasks => setTasks(tasks));

        getUsers()
            .then(user => setUsers(user));
    }, []);

    const onTaskCreated = (createdTask: Task) => {
        const newTasks = tasks.concat(createdTask);
        setTasks(newTasks);
    };

    const onTaskDeleted = ({ taskName }: Task) => {
        const filteredTasks = tasks.filter(task => task.taskName !== taskName);
        setTasks(filteredTasks);
    };

    const onTaskCompleted = async () => {
        const users = await getUsers();
        setUsers(users);
    };

    return (

        <PageWrapper>

            {household && <>

                <Tasks
                    onTaskCompleted={onTaskCompleted}
                    onTaskDeleted={onTaskDeleted}
                    onTaskCreated={onTaskCreated}
                    tasks={tasks}
                />
            </>}

        </PageWrapper>
    );
};

export default HouseholdPage;
import React, { useEffect, useState } from 'react';

import PageWrapper from '../../common/page-wrapper';
import Link from '../../common/link';

import { getUsers, getHousehold, getTasks, logout, switchUser } from '../../common/api-operations';
import CreateTaskForm from './create-task-form';
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
            <Link
                to='/'
                onClick={() => logout()}
            >
                Log out
            </Link>
            <Link
                to='/login'
                onClick={() => switchUser()}
            >
                Switch User
            </Link>

            {household && <>

                <h1>{household.householdName}</h1>

                {users.map((user, key) =>
                    <div key={key}>
                        <h3>
                            {user.userName}, {user.points}p
                        </h3>
                    </div>
                )}

                <Tasks
                    onTaskCompleted={onTaskCompleted}
                    onTaskDeleted={onTaskDeleted}
                    tasks={tasks}
                />

                <CreateTaskForm
                    onTaskCreated={onTaskCreated}
                />
            </>}

        </PageWrapper>
    );
};

export default HouseholdPage;
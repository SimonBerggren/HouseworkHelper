import React, { useEffect, useState } from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import Link from '../../common/link/link';

import { deauthenticate, getEmail, getUserName } from '../../app/authentication';
import { get, post, remove } from '../../api/api';
import Input from '../../common/input/input';

const frequencies = [
    'Daily',
    'Weekly',
    'Semiweekly',
    'Quaterly',
    'Semiannually',
    'Annually'
];

const HouseholdPage: React.FC = () => {

    const [household, setHousehold] = useState<Household>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>();
    const [frequency, setFrequency] = useState<string>('');
    const [points, setPoints] = useState<number>(0);

    const email = getEmail();
    const userName = getUserName();

    useEffect(() => {
        get('household')
            .then(household => setHousehold(household));

        get('task')
            .then(tasks => setTasks(tasks));

        get(`user/${email}`)
            .then(user => setUsers(user));
    }, []);

    const createNewTask = () => {

        const newTask: Task = { name, email, frequency, points, description };

        post('task', newTask)
            .then(task => {
                const newTasks = tasks.concat(task);
                setTasks(newTasks);
            });
    };

    const removeTask = (event: React.MouseEvent, name: string) => {
        event.stopPropagation();
        const taskToRemove = { name, email };

        if (confirm(
            `Are you sure you want to delete ${name}? \nThis action is irreversible!`)
        ) {
            remove('task', taskToRemove)
                .then(() => {
                    const filteredTasks = tasks.filter(task => task.name !== name);
                    setTasks(filteredTasks);
                });
        }
    };

    const completeTask = ({ name, email, points }: Task) => {

        post(`completed-task/${userName}`, { name, email, points });
    };

    return (
        <PageWrapper>
            {household && <>

                <Link
                    to='/'
                    onClick={() => deauthenticate()}
                >
                    Log out
                </Link>

                <h1>{household.name}</h1>

                {users.map(user =>
                    <>
                        <h3>
                            {user.name}, {user.points}p
                        </h3>
                    </>
                )}

                <h1>Existing Tasks</h1>

                {tasks &&
                    tasks.map((task, key) =>
                        <div
                            key={key}
                            onClick={() => completeTask(task)}
                        >
                            {task.name}
                            <div
                                onClick={e => removeTask(e, task.name)}
                            >
                                x
                            </div>
                        </div>
                    )}

                <h1>Create new task</h1>

                <Input type='text' onChange={e => setName(e.currentTarget.value)} />

                <textarea onChange={e => setDescription(e.currentTarget.value)} />

                <Input type='number' defaultValue={points} onChange={e => setPoints(parseInt(e.currentTarget.value))} />

                <select onChange={e => setFrequency(e.currentTarget.value)}>
                    <option ></option>
                    {frequencies.map((frequency, key) =>
                        <option
                            key={key}
                            value={frequency}
                        >
                            {frequency}
                        </option>
                    )}
                </select>

                <Input type='button' value='Create new task' onClick={createNewTask} />



            </>}
        </PageWrapper>
    );
};

export default HouseholdPage;
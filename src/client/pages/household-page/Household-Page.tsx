import React, { useEffect, useState } from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import Input from '../../common/input/input';
import Link from '../../common/link/link';

import { getUsers, getHousehold, getTasks, createTask, deleteTask, completeTask, logout, switchUser } from '../../api/operations';
import { getUserName } from '../../app/authentication';

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

    const [taskName, setTaskName] = useState<string>('');
    const [desc, setDesc] = useState<string>();
    const [frequency, setFrequency] = useState<string>('');
    const [points, setPoints] = useState<number>(0);

    const userName = getUserName();

    useEffect(() => {
        getHousehold()
            .then(household => setHousehold(household));

        getTasks()
            .then(tasks => setTasks(tasks));

        getUsers()
            .then(user => setUsers(user));
    }, []);

    const create = async () => {

        const createdTask = await createTask({ taskName, frequency, points, desc });

        if (createdTask) {
            const newTasks = tasks.concat(createdTask);
            setTasks(newTasks);
        }
    };

    const remove = async (event: React.MouseEvent, taskName: string) => {
        event.stopPropagation();

        if (confirm(
            `Are you sure you want to delete ${taskName}?\nThis action is irreversible!`)
        ) {
            const deletedTask = await deleteTask(taskName);

            if (deletedTask) {
                const filteredTasks = tasks.filter(task => task.taskName !== deletedTask.taskName);
                setTasks(filteredTasks);
            }
        }
    };

    const complete = async ({ taskName }: Task) => {
        const completed = await completeTask({ taskName, userName });

        if (completed) {

            const users = await getUsers();
            setUsers(users);
        }
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

                {users.map(user =>
                    <>
                        <h3>
                            {user.userName}, {user.points}p
                        </h3>
                    </>
                )}

                <h1>Existing Tasks</h1>

                {tasks &&
                    tasks.map((task, key) =>
                        <div
                            key={key}
                            onClick={() => complete(task)}
                        >
                            {task.taskName}
                            <div
                                onClick={e => remove(e, task.taskName)}
                            >
                                x
                            </div>
                        </div>
                    )}

                <h1>Create new task</h1>

                <Input type='text' onChange={e => setTaskName(e.currentTarget.value)} />

                <textarea onChange={e => setDesc(e.currentTarget.value)} />

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

                <Input type='button' value='Create new task' onClick={create} />



            </>}
        </PageWrapper>
    );
};

export default HouseholdPage;
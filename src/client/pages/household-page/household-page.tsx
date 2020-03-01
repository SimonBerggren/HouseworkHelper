import React, { useEffect, useState } from 'react';

import PageWrapper from '../../common/page-wrapper';
import Tasks from './tasks';

import { getHousehold, getTasks } from '../../common/api-operations';

const HouseholdPage: React.FC = () => {

    const [household, setHousehold] = useState<Household>();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getHousehold()
            .then(household => setHousehold(household));

        getTasks()
            .then(tasks => setTasks(tasks));
    }, []);

    const onTaskCreated = (createdTask: Task) => {
        const newTasks = tasks.concat(createdTask);
        setTasks(newTasks);
    };

    const onTaskEdited = (oldTask: Task, updatedTask: Task) => {
        const indexOfOldTask = tasks.findIndex(task => task.taskName === oldTask.taskName);
        if (indexOfOldTask >= 0) {
            const copy = [...tasks];
            copy.splice(indexOfOldTask, 1, updatedTask);
            setTasks(copy);
        }
    };

    const onTaskDeleted = ({ taskName }: Task) => {
        const filteredTasks = tasks.filter(task => task.taskName !== taskName);
        setTasks(filteredTasks);
    };

    const onTaskCompleted = async () => {
    };

    return (

        <PageWrapper>

            {household && <>

                <Tasks
                    onTaskCompleted={onTaskCompleted}
                    onTaskDeleted={onTaskDeleted}
                    onTaskCreated={onTaskCreated}
                    onTaskEdited={onTaskEdited}
                    tasks={tasks}
                />
            </>}

        </PageWrapper>
    );
};

export default HouseholdPage;
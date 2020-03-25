import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { PageWrapper } from '../../common/utils/page-wrapper';
import Users from './users';
import Tasks from './tasks';

import { getHousehold, getAllTasks, getAllRewards, getUsers } from '../../common/utils/api-operations';
import Rewards from '../rewards-page/rewards';

const HouseholdPage: React.FC = () => {

    const [household, setHousehold] = useState<Household>();
    const [users, setUsers] = useState<User[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [rewards, setRewards] = useState<Reward[]>([]);

    useEffect(() => {
        getHousehold()
            .then(household => setHousehold(household));

        getUsers()
            .then(users => setUsers(users));

        getAllTasks()
            .then(tasks => setTasks(tasks));

        getAllRewards()
            .then(rewards => setRewards(rewards));
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

    const onRewardCreated = (createdReward: Reward) => {
        const newRewards = rewards.concat(createdReward);
        setRewards(newRewards);
    };

    const onRewardEdited = (oldReward: Reward, updatedReward: Reward) => {
        const indexOfOldTask = rewards.findIndex(task => task.rewardName === oldReward.rewardName);
        if (indexOfOldTask !== -1) {
            const copy = [...rewards];
            copy.splice(indexOfOldTask, 1, updatedReward);
            setRewards(copy);
        }
    };

    const onRewardDeleted = ({ rewardName }: Reward) => {
        const filteredTasks = rewards.filter(reward => reward.rewardName !== rewardName);
        setRewards(filteredTasks);
    };

    return (

        <PageWrapper>

            {household && <>

                <h2>{household.householdName}</h2>
                <br />

                <TasksTitle >{'Users'}</TasksTitle >

                <Users
                    users={users}
                />

                <br />

                <TasksTitle >{'Tasks'}</TasksTitle >

                <Tasks
                    tasks={tasks}
                    onTaskCreated={onTaskCreated}
                    onTaskEdited={onTaskEdited}
                    onTaskDeleted={onTaskDeleted}
                />

                <br />

                <TasksTitle >{'Rewards'}</TasksTitle >

                <Rewards
                    rewards={rewards}
                    onRewardCreated={onRewardCreated}
                    onRewardEdited={onRewardEdited}
                    onRewardDeleted={onRewardDeleted}
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
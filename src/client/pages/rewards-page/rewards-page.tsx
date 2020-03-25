import React, { useState, useEffect } from 'react';

import Rewards from './rewards';

import { getRewards } from '../../common/utils/api-operations';
import { PageWrapper } from '../../common/utils/page-wrapper';

const RewardsPage: React.FC = () => {

    const [rewards, setRewards] = useState<Reward[]>([]);

    useEffect(() => {
        getRewards()
            .then(rewards => setRewards(rewards));
    }, []);

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
            <Rewards
                rewards={rewards}
                onRewardCreated={onRewardCreated}
                onRewardEdited={onRewardEdited}
                onRewardDeleted={onRewardDeleted}
            />
        </PageWrapper>
    );
};

export default RewardsPage;
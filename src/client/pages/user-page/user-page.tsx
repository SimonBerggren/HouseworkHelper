import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ProfilePicture from '../../common/components/profile-picture';
import { PageWrapper } from '../../common/utils/page-wrapper';
import HouseholdInfo from './household-info';
import Tasks from './tasks';

import { getHousehold, getUsers, getTasks } from '../../common/utils/api-operations';
import { UserContext } from '../../app/user-context';

const UserPage: React.FC = () => {

    const [household, setHousehold] = useState<Household>();
    const [users, setUsers] = useState<User[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getHousehold().then(setHousehold);
        getUsers().then(setUsers);
        getTasks().then(setTasks);
    }, []);

    return (
        <UserContext.Consumer>
            {({ user }) =>
                <PageWrapper>
                    <ProfilePicture
                        size='large'
                        pic={user.profilePicture}
                    />
                    <UserInfoContainer>
                        <h3>{user.userName}</h3>
                        <h4>{user.points} points</h4>
                    </UserInfoContainer>

                    <br />

                    {household &&
                        <HouseholdInfo
                            household={household}
                            kidView={user.isKid}
                            users={users}
                        />
                    }

                    <br />

                    <Tasks
                        tasks={tasks}
                    />

                </PageWrapper>
            }
        </UserContext.Consumer >
    );
};

const UserInfoContainer = styled.div`
    width: 280px;
    padding: 20px;
`;

export default UserPage;
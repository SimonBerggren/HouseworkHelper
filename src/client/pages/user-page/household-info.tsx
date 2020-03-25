import styled, { css } from 'styled-components';
import React from 'react';

import ProfilePicture from '../../common/components/profile-picture';
import Link from '../../common/components/link';

import { growWidthIn } from '../../style/mixins';

type HouseholdInfoProps = {
    household: Household;
    kidView: boolean;
    users: User[];
}

const HouseholdInfo: React.FC<HouseholdInfoProps> = ({ household, users, kidView }: HouseholdInfoProps) => {

    return (
        <Container>
            <Link to={'/household'} onClick={e => kidView && e.preventDefault()}>
                <h3>{household.householdName}</h3>
            </Link>

            {
                users.map((u, key) =>
                    <User
                        key={key}
                        percentage={Math.round(Math.random() * 100)}
                    >
                        <span><span></span></span>

                        <ProfilePicture
                            size='small'
                            pic={u.profilePicture}
                        />
                        <h4>{u.userName}</h4>

                    </User>
                )
            }

        </Container >
    );
};

const Container = styled.div`
    ${({ theme }) => css`
        width: 280px;
        border-radius: 10px;

        background: rgba(255, 255, 255, 0.7);
        padding: 10px;

        a {
            color: ${theme.palette.primary.main};
        }
    `}
`;

const User = styled.div`
    ${({ theme, percentage }): any => css`

        position: relative;

        display: flex;
        align-items: center;

        width: 100%;
        max-width: 280px;

        margin-top: 10px;
        padding: 5px;

        color: white;
        z-index: 1;

        span {
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            height: 100%;
            width: calc(100% - 15px);

            border-radius: 35px;

            background-color: rgba(0,0,0,0.4);

            span {
                ${growWidthIn(1, percentage)}
                transition: width 1s;
                
                width: calc( ${20 + percentage}% );
                min-width: 12%;
                max-width: calc(100% - (10px * 2));
                height: calc(100% - (10px * 2));
                margin: 10px;

                background-color: ${theme.palette.primary.main};
            }
        }
    `}
`;

export default HouseholdInfo;
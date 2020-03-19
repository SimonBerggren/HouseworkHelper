import { AppBar, Toolbar } from '@material-ui/core';
import styled, { css } from 'styled-components';
import React from 'react';

import Link from '../common/components/link';

import { deauthenticate } from '../common/user/authentication';
import { UserContext } from './user-context';
import ProfilePicture from '../common/components/profile-picture';

const MenuBar = () => {

    return (
        <StyledAppBar >
            <UserContext.Consumer>
                {({ user, authenticated }) =>
                    <Bar>
                        <h3 >
                            <Link to='/' >
                                {'HouseWorkHelper'}
                            </Link>
                        </h3>

                        <RightArea>

                            {user &&
                                <StyledLink to='/users'>
                                    <div>
                                        {user.userName}
                                        <br />
                                        {user.points}p
                                    </div>
                                    <ProfilePicture
                                        pic={user.profilePicture}
                                        size='small'
                                    />
                                </StyledLink>
                            }

                            {authenticated ?
                                <Link to='/'
                                    onClick={() => deauthenticate()}
                                >
                                    {'Logout'}
                                </Link>
                                :
                                <Link to='/login'>
                                    {'Login'}
                                </Link>
                            }
                        </RightArea>
                    </Bar>
                }
            </UserContext.Consumer>
        </StyledAppBar>
    );
};

const StyledAppBar = styled(AppBar)`
   && {
        ${({ theme }) => css`
            background-color: ${theme.palette.primary.main};
        `}
    }
`;

const Bar = styled(Toolbar)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: bold;
`;

const RightArea = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledLink = styled(Link)`
    display: flex;
    text-align: right;
    margin-right: 10px;
`;

export default MenuBar;
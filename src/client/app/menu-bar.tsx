import styled, { css } from 'styled-components';
import React from 'react';

import { AppBar, Toolbar } from '@material-ui/core';

import ProfilePicture from '../common/components/profile-picture';
import Link from '../common/components/link';

import { deauthenticate } from '../common/user/authentication';
import { UserContext } from './user-context';

const MenuBar = () => {

    return (
        <StyledAppBar >
            <UserContext.Consumer>
                {({ user, authenticated }) =>
                    <Bar>
                        <Link to='/' >
                            <h3 >
                                {'HouseWorkHelper'}
                            </h3>
                        </Link>

                        <RightArea>

                            {!location.pathname.endsWith('/user') && user &&
                                <StyledLink to='/user'>
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
                                <StyledLink to='/'
                                    onClick={() => deauthenticate()}
                                >
                                    {'Logout'}
                                </StyledLink>
                                :
                                <StyledLink to='/login'>
                                    {'Login'}
                                </StyledLink>
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
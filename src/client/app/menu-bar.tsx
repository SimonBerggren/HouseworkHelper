import { AppBar, Toolbar } from '@material-ui/core';
import styled, { css } from 'styled-components';
import React from 'react';

import Link from '../common/components/link';

import { deauthenticate } from '../common/user/authentication';
import { UserContext } from './user-context';

const MenuBar = () => {

    return (
        <StyledAppBar >
            <UserContext.Consumer>
                {userContext =>
                    <Bar>
                        <h2 >
                            <Link to='/' >HouseWorkHelper</Link>
                        </h2>

                        <div>

                            {userContext.userName &&
                                <Link to='/users'>
                                    {userContext.userName}
                                    <br />
                                    {userContext.userPoints}p
                                </Link>
                            }

                            {userContext.authenticated ?
                                <Link to='/' onClick={() => deauthenticate()}> Logout </Link>
                                :
                                <Link to='/login'> Login </Link>
                            }
                        </div>
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

export default MenuBar;
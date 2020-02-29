import { AppBar, Toolbar } from '@material-ui/core';
import styled from 'styled-components';
import React from 'react';

import Link from './link';

import { deauthenticate } from './user/authentication';
import { UserContext } from '../app/user-context';

const MenuBar = () => {

    return (
        <UserContext.Consumer>
            {userContext =>
                <AppBar position="fixed">
                    <Bar>
                        <MenuTitle >
                            <Link to='/' >HouseWorkHelper</Link>
                        </MenuTitle>

                        <div>

                            {userContext.userName &&
                                <MenuLink to='/users'> {userContext.userName} </MenuLink>
                            }

                            {userContext.authenticated ?
                                <MenuLink to='/' onClick={() => deauthenticate()}> Logout </MenuLink>
                                :
                                <MenuLink to='/login'> Login </MenuLink>
                            }
                        </div>
                    </Bar>
                </AppBar>
            }
        </UserContext.Consumer>
    )
}

const Bar = styled(Toolbar)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: bold;
`;

const MenuTitle = styled.h1`
    cursor: default;
    margin-bottom: 10vh;
    font-size: 1.3em;
    margin: 0;

    a {
        text-decoration: none;
    }
`;

const MenuLink = styled(Link)`
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

export default MenuBar;
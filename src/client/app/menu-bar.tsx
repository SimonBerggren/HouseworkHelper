import styled, { css } from 'styled-components';
import React, { useState, useEffect } from 'react';

import { AppBar, Toolbar, Badge } from '@material-ui/core';

import NotificationsIconNone from '@material-ui/icons/NotificationsNone';
import NotificationsIcon from '@material-ui/icons/NotificationsActive';

import HamburgerMenu from './hamburger-menu';
import Link from '../common/components/link';
import { getRequests } from '../common/utils/api-operations';

const MenuBar = () => {

    const [notifications, setNotifications] = useState<number>(0);

    useEffect(() => {
        getRequests().then(requests => setNotifications(requests.length));
    }, []);

    return (
        <StyledAppBar >

            <Bar>
                <Link to='/' >
                    <h3 >
                        {'HouseWorkHelper'}
                    </h3>
                </Link>

                <span>
                    <Badge badgeContent={notifications}>
                        <NotificationsIconNone />
                        {/* <NotificationsIcon /> */}
                    </Badge>

                    <HamburgerMenu />
                </span>
            </Bar>

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
import styled, { css } from 'styled-components';
import React from 'react';

import { AppBar, Toolbar } from '@material-ui/core';

import HamburgerMenu from './hamburger-menu';
import Link from '../common/components/link';

const MenuBar = () => {

    return (
        <StyledAppBar >

            <Bar>
                <Link to='/' >
                    <h3 >
                        {'HouseWorkHelper'}
                    </h3>
                </Link>

                <HamburgerMenu />
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
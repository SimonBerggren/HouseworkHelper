import styled from 'styled-components';
import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';

import PeopleIcon from '@material-ui/icons/PeopleAlt';
import ExitIcon from '@material-ui/icons/ExitToApp';
import RedeemIcon from '@material-ui/icons/Redeem';
import HomeIcon from '@material-ui/icons/Home';

import ProfilePicture from '../common/components/profile-picture';
import IconButton from '../common/components/icon-button';
import Link from '../common/components/link';

import { isFullyConfigured } from '../common/user/authentication';
import { logout } from '../common/utils/api-operations';
import { UserContext } from './user-context';

const HamburgerMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(undefined);
    };

    return (
        <UserContext.Consumer>
            {({ user }) =>
                <HamburgerContainer>

                    <IconButton
                        onClick={handleClick}
                        icon='menu'
                        iconSize='large'
                    />

                    <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >

                        {isFullyConfigured() &&
                            <span>
                                <MenuItem onClick={handleClose}>

                                    <StyledLink to='/user'>
                                        <ProfilePicture
                                            pic={user.profilePicture}
                                            size='small'
                                        />

                                        <div>
                                            {user.userName}
                                            <br />
                                            {user.points}p
                                        </div>

                                    </StyledLink>
                                </MenuItem>

                                {user && !user.isKid &&
                                    <span>
                                        < MenuItem >
                                            <StyledLink to='/household'>
                                                <HomeIcon />
                                                {'Household'}
                                            </StyledLink>
                                        </MenuItem>

                                        <MenuItem>
                                            <StyledLink to='/users' >
                                                <PeopleIcon />
                                                {'Users'}
                                            </StyledLink>
                                        </MenuItem>
                                    </span>

                                }

                                <MenuItem onClick={handleClose}>
                                    <StyledLink to='/rewards'>
                                        <RedeemIcon />
                                        {'Rewards'}
                                    </StyledLink>
                                </MenuItem>

                                <MenuItem disabled></MenuItem>
                            </span>
                        }

                        <MenuItem onClick={handleClose}>
                            {isFullyConfigured() ?
                                <StyledLink to='/'
                                    onClick={logout}
                                >
                                    <ExitIcon />
                                    {'Logout'}
                                </StyledLink>
                                :
                                <StyledLink to='/login'>
                                    <ExitIcon />
                                    {'Login'}
                                </StyledLink>
                            }
                        </MenuItem>

                    </Menu>
                </HamburgerContainer>
            }
        </UserContext.Consumer >
    );
};

const HamburgerContainer = styled.span`
    * {
        color: black;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    text-align: right;
    margin-right: 10px;
    color: black;
    justify-content: space-between;
    width: 100%;
    min-width: 125px;
`;

export default HamburgerMenu;
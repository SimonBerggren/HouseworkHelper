import styled from 'styled-components';
import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';

import ProfilePicture from '../common/components/profile-picture';
import IconButton from '../common/components/icon-button';
import Link from '../common/components/link';

import { deauthenticate, isFullyConfigured } from '../common/user/authentication';
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

                        {!location.pathname.endsWith('/user') && isFullyConfigured() &&
                            <MenuItem onClick={handleClose}>

                                <StyledLink to='/user'>
                                    <ProfilePicture
                                        pic={user.profilePicture}
                                        size='small'
                                    />
                                </StyledLink>
                                
                                <div>
                                    {user.userName}
                                    <br />
                                    {user.points}p
                                </div>

                            </MenuItem>
                        }

                        {!user.isKid &&
                            <MenuItem>
                                <StyledLink to='household' label='View Household' />
                            </MenuItem>
                        }

                        <MenuItem>
                            {isFullyConfigured() ?
                                <StyledLink to='/'
                                    onClick={() => deauthenticate()}
                                    label='Logout'
                                />
                                :
                                <StyledLink to='/login' label='Login' />
                            }
                        </MenuItem>

                    </Menu>
                </HamburgerContainer>
            }
        </UserContext.Consumer>
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
`;

export default HamburgerMenu;
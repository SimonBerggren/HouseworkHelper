import React from 'react';
import { TableBody, TableCell, TableContainer, Table, TableHead, TableRow } from '@material-ui/core';
import ProfilePicture from '../../common/components/profile-picture';
import Link from '../../common/components/link';
import styled, { css } from 'styled-components';
import IconButton from '../../common/components/icon-button';

interface UsersProps {
    users: User[];
}

const Users: React.FC<UsersProps> = ({ users }: UsersProps) => {

    return (
        <Container style={{ width: '90%' }}>
            <Table stickyHeader size='small'>
                <TableHead >
                    <TableRow>
                        <TH padding='none' style={{ width: '48px' }}>
                            <Link to='/users'>
                                <IconButton icon='add' iconSize='small' />
                            </Link>
                        </TH>
                        <TH>
                            User
                        </TH>
                        <TH align='right'>
                            Points
                        </TH>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, key) =>
                        <BodyTR
                            key={key}
                            className={`${key % 2 ? 'odd' : 'even'}`}
                        >
                            <TableCell size='small' padding='none'>
                                <ProfilePicture size='small' pic={user.profilePicture} />
                            </TableCell>
                            <TableCell >
                                {user.userName}
                            </TableCell>
                            <TableCell align='right'>
                                {user.points}
                            </TableCell>
                        </BodyTR>
                    )}
                </TableBody>
            </Table>
        </Container >
    );
};

const TH = styled(TableCell)`
    && {
        ${({ theme }) => css`
            background-color: ${theme.palette.primary.main};
            color: white;
        `}
    }
`;

const BodyTR = styled(TableRow)`
    ${({ theme }) => css`
        background-color: ${theme.palette.primary.main};

        &.odd {
            background-color: ${theme.palette.primary.light};
            h4, p {
                color: white ;
                white-space: nowrap;
                max-width: 170px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        &.even {
            background-color: white;

            button {
                color: ${theme.palette.primary.light};
            }
        }

        &:hover {
            background-color: ${theme.palette.primary.main};
        }

        .deleting {
            opacity: 0.5;
            pointer-events: none;
        }
    `}
`;

const Container = styled(TableContainer)`
&& {
    min-height: 250px;
}
`;

export default Users;
import React from 'react';
import { TableBody, TableCell, TableContainer, Table, TableHead, TableRow } from '@material-ui/core';
import ProfilePicture from '../../common/components/profile-picture';
import Link from '../../common/components/link';

interface UsersProps {
    users: User[];
}

const Users: React.FC<UsersProps> = ({ users }: UsersProps) => {

    return (
        <TableContainer style={{ width: '90%' }}>
            <Table stickyHeader size='small'>
                <TableHead >
                    <TableRow>
                        <TableCell padding='none' style={{ width: '48px' }}>
                            <Link to='/users'>
                                <h4 style={{ color: 'black' }}>Edit</h4>
                            </Link>
                        </TableCell>
                        <TableCell>
                            User
                        </TableCell>
                        <TableCell>
                            Points
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, key) =>
                        <TableRow key={key}>
                            <TableCell padding='none' style={{ backgroundColor: 'purple' }}>
                                <ProfilePicture size='small' pic={user.profilePicture} />
                            </TableCell>
                            <TableCell style={{ backgroundColor: 'purple' }}>
                                {user.userName}
                            </TableCell>
                            <TableCell style={{ backgroundColor: 'purple' }}>
                                {user.points}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer >
    );
};

export default Users;
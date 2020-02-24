import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Input from '../../common/input';

import { createUser, deleteUser, getUsers } from '../../common/api-operations';
import { flexCenter } from '../../style/mixins';

interface PickUserProps {
    onUserSelected: (userName: string) => void;
}

const SelectUser: React.FC<PickUserProps> = ({ onUserSelected: onUserPicked }: PickUserProps) => {

    const [users, setUsers] = useState<User[]>([]);
    const [newUserName, setNewUserName] = useState('');

    useEffect(() => {
        getUsers().then(users => setUsers(users));
    }, []);

    const create = async () => {
        const createdUser = await createUser({ userName: newUserName });

        if (createdUser) {
            setUsers(users.concat(createdUser));
        }
    };

    const remove = async (event: React.MouseEvent, userName: string) => {

        event.stopPropagation();

        if (confirm(
            `Are you sure you want to delete ${userName}? \nThis action is irreversible!`)
        ) {
            const deletedUser = await deleteUser({ userName });

            if (deletedUser) {
                const filteredUsers = users.filter(user => user.userName !== userName);
                setUsers(filteredUsers);
            }
        }
    };

    return (
        <>
            {users.length > 0 &&
                <>
                    <h1>Select a user</h1>

                    <Users>
                        {users.map((user, key) =>

                            <User
                                key={key}
                                onClick={() => onUserPicked(user.userName)}
                            >
                                <RemoveButton
                                    onClick={(e) => remove(e, user.userName)}
                                >
                                    x
                                </RemoveButton>

                                {user.userName}

                            </User>
                        )}
                    </Users>
                </>
            }

            <Divider />

            <h1>Create a new user</h1>

            <Input type='text' onChange={e => setNewUserName(e.currentTarget.value)} />

            <Input type='button' value='Create new user' onClick={create} />
        </>
    );
};

const Divider = styled.div`
    margin-top: 5em;
`;

const User = styled.div`
    ${flexCenter}
    justify-content: flex-end;
    position: relative;
    width: 5em;
    height: 5em;
    font-size: 1.3em;
    border: 0.1em solid #01579b;
    margin: 0.5em;
    padding: 0.5em;
    cursor: pointer;
    :hover {
        border-color: #2196f3;
    }
`;

const RemoveButton = styled.div`
    ${flexCenter}
    justify-content: center;
    font-size: 1.1em;
    padding: 0;
    top: 0;
    right: 0;
    position: absolute;
    border-bottom: 0.1em solid #01579b;
    border-left: 0.1em solid #01579b;
    width: 1.5em;
    height: 1.5em;
    :hover {
        color: #2196f3;
        font-weight: bold;
        border-color: #2196f3;
    }
`;

const Users = styled.div`
    width: 50em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export default SelectUser;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Input from '../../common/input/input';

import { get, post, remove } from '../../api/api';
import { flexCenter } from '../../style/mixins';

interface PickUserProps {
    onUserPicked: (name: string) => void;
    email: string;
}

const SelectUser: React.FC<PickUserProps> = ({ onUserPicked, email }: PickUserProps) => {

    const [users, setUsers] = useState<User[]>([]);
    const [newUserName, setNewUserName] = useState('');

    useEffect(() => {
        get('user').then(users => setUsers(users));
    }, []);

    const createNewUser = () => {
        const newUser = { name: newUserName, email, points: 0 };
        post('user', newUser)
            .then(() => setUsers(users.concat(newUser)))
            .catch(error => alert(error));
    };

    const removeUser = (event: React.MouseEvent, name: string) => {

        event.stopPropagation();

        const userToRemove = { name, email };

        if (confirm(
            `Are you sure you want to delete ${name}? \nThis action is irreversible!`)
        ) {
            remove('user', userToRemove)
                .then(() => {
                    const filteredUsers = users.filter(user => user.name !== name);
                    setUsers(filteredUsers);
                });
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
                                onClick={() => onUserPicked(user.name)}
                            >
                                <RemoveButton
                                    onClick={(e) => removeUser(e, user.name)}
                                >x</RemoveButton>
                                {user.name}
                            </User>
                        )}
                    </Users>
                </>
            }
            <Divider />
            <h1>Create a new user</h1>
            <Input type='text' onChange={e => setNewUserName(e.currentTarget.value)} />
            <Input type='button' value='Create new user' onClick={createNewUser} />
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
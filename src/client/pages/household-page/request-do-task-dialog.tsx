import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { DialogContent, DialogContentText, DialogActions, Divider, FormControlLabel, Switch } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import ProfilePicture from '../../common/components/profile-picture';
import TextInput from '../../common/components/input/text-input';
import Dialog from '../../common/components/dialog/dialog';
import Button from '../../common/components/button';

import { getUsers } from '../../common/utils/api-operations';
import { flexCenter } from '../../style/mixins';

type RequestDoTaskDialogProps = {
    task?: Task;
    onClose: () => void;
    onRequestDoTask: (data: RequestDoTask) => void;
}

const defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 1);
defaultDate.setHours(0, 0, 0, 0);

const RequestDoTaskDialog: React.FC<RequestDoTaskDialogProps> = ({ task, onClose, onRequestDoTask }: RequestDoTaskDialogProps) => {

    const [enableExtraPoints, setEnableExtraPoints] = useState<boolean>(false);
    const [enableDeadline, setEnableDeadline] = useState<boolean>(false);
    const [doneByDate, setDoneByDate] = useState<Date>(defaultDate);
    const [doneByTime, setDoneByTime] = useState<Date>(defaultDate);
    const [extraPoints, setExtraPoints] = useState<number>(0);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [comments, setComments] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    useEffect(() => {
        if (task) {
            if (enableExtraPoints) {
                setTotalPoints(task.points + extraPoints);
            } else {
                setTotalPoints(task.points * 2);
            }
        }
    }, [enableExtraPoints, extraPoints, task]);

    const onAskClicked = () => {

        if (!task || !selectedUser) {
            return;
        }

        onRequestDoTask({
            deadlineDate: enableDeadline ? doneByDate.getTime() : undefined,
            deadlineTime: enableDeadline ? doneByTime.getTime() : undefined,
            fromUserName: '',
            toUserName: selectedUser.userName,
            comments,
            taskName: task.taskName,
            points: totalPoints
        });
    };

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Dialog
                size='large'
                title={task && `${task.taskName} - ${task.points}p`}
                open={task !== undefined}
                onClose={onClose}
            >
                <DialogContent dividers>

                    {task &&
                        <>
                            <DialogContentText>
                                {task.desc ||
                                    <NoDescriptionText>
                                        {'No description'}
                                    </NoDescriptionText>
                                }
                            </DialogContentText>

                            <Divider />

                            {!selectedUser &&
                                <SelectUsersText>
                                    {'Who do you want to ask?'}
                                </SelectUsersText>
                            }

                            <UsersContainer>

                                {users.map((user, key) => {

                                    const isSelected = selectedUser && selectedUser.userName === user.userName;

                                    return <UserContainer key={key}
                                        className={selectedUser && `selected-mode ${isSelected ? 'selected' : undefined}`}
                                        onClick={() => setSelectedUser(selectedUser ? undefined : user)}
                                    >
                                        <ProfilePicture pic={user.profilePicture} />
                                        <h4>{user.userName}</h4>
                                    </UserContainer>;
                                })}

                            </UsersContainer>

                            <Divider />

                            <FormControlLabel
                                label='Automatically give double points'
                                control={
                                    <Switch
                                        color='primary'
                                        checked={!enableExtraPoints}
                                        onChange={() => setEnableExtraPoints(!enableExtraPoints)}
                                    />
                                }
                            />

                            {enableExtraPoints &&
                                <TextInput fullWidth
                                    variant='standard'
                                    value={extraPoints}
                                    label='Extra Points'
                                    onChange={e => setExtraPoints(parseInt(e.currentTarget.value) || 0)}
                                />
                            }

                            <Divider />

                            <FormControlLabel
                                label='Deadline'
                                control={
                                    <Switch
                                        color='primary'
                                        checked={enableDeadline}
                                        onChange={() => setEnableDeadline(!enableDeadline)}
                                    />
                                }
                            />

                            {enableDeadline &&
                                <div>
                                    <KeyboardDatePicker
                                        margin='normal'
                                        label='Done before'
                                        value={doneByDate}
                                        minDate={new Date()}
                                        onChange={e => setDoneByDate(e ? e.toDate() : defaultDate)}
                                    />

                                    <KeyboardTimePicker
                                        margin='normal'
                                        ampm={false}
                                        value={doneByTime}
                                        onChange={e => setDoneByTime(e ? e.toDate() : defaultDate)}
                                    />
                                </div>
                            }

                            <Divider />

                            <TextInput fullWidth multiline
                                label='Comments'
                                value={comments}
                                variant='standard'
                                onChange={e => setComments(e.currentTarget.value)}
                            />

                            <Divider />

                            <TotalPointsText color='textPrimary'>
                                {`Total Points: ${totalPoints}p`}
                            </TotalPointsText>

                        </>
                    }

                </DialogContent>

                <SplitActions>

                    <Button
                        onClick={onClose}
                        color='primary'
                        label='Cancel'
                    />

                    <Button
                        onClick={onAskClicked}
                        color='primary'
                        label='Ask'
                    />

                </SplitActions>

            </Dialog >
        </MuiPickersUtilsProvider>
    );
};

const NoDescriptionText = styled.span`
    font-style: italic;
`;

const SelectUsersText = styled(DialogContentText)`
&& {
    margin-top: 10px;
    margin-bottom: -10px;
}
`;

const UsersContainer = styled.div`
    overflow-x: scroll;
    display: flex;
    min-height: 120px;
`;

const UserContainer = styled.div`
    ${flexCenter}
    margin: 8px;

    &.selected-mode {
        display: none;
    }

    &.selected {
        display: flex;
    }
`;

const TotalPointsText = styled(DialogContentText)`
&& {
    font-size: 1.15em;
    text-align: right;

    margin-top: 20px;
    margin-bottom: -10px;
}
`;

const SplitActions = styled(DialogActions)`
&& {
    justify-content: space-between;
}
`;

export default RequestDoTaskDialog;
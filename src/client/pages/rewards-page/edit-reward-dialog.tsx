import React, { useState, useEffect } from 'react';

import { DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Input, FormControlLabel } from '@material-ui/core';

import ConfirmDialog from '../../common/components/dialog/confirm-dialog';
import TextInput from '../../common/components/input/text-input';
import Dialog from '../../common/components/dialog/dialog';
import Button from '../../common/components/button';

import { getUsers, editReward, createReward } from '../../common/utils/api-operations';
import { getUser } from '../../common/user/user-info';
import { UserContext } from '../../app/user-context';

type EditRewardDialogProps = {
    onRewardCreated: (rewardToCreate: Reward) => void;
    onRewardEdited: (oldReward: Reward, updatedReward: Reward) => void;
    onClose: () => void;
    rewardToEdit?: Reward;
    open: boolean;
}

const defaultValues = (defaultReward?: Reward): Reward => {
    return {
        rewardName: defaultReward ? defaultReward.rewardName : '',
        desc: defaultReward ? defaultReward.desc : '',
        points: defaultReward ? defaultReward.points : 0,
        visibleTo: defaultReward ? defaultReward.visibleTo : [(getUser() as User).userName],
        visibleToEveryone: defaultReward ? defaultReward.visibleToEveryone : true
    };
};

const EditRewardDialog: React.FC<EditRewardDialogProps> = ({ open, rewardToEdit, onClose, onRewardCreated, onRewardEdited }: EditRewardDialogProps) => {

    const [reward, setReward] = useState<Reward>(defaultValues(rewardToEdit));
    const [users, setUsers] = useState<User[]>([]);
    const [confirmingCreateMore, setConfirmingCreateMore] = useState<boolean>(false);

    useEffect(() => {
        if (open || rewardToEdit) {
            setReward(defaultValues(rewardToEdit));
            if (!users.length || (!users.length && rewardToEdit)) {
                getUsers()
                    .then(users => setUsers(users));
            }
        }
    }, [open, rewardToEdit]);

    const onEditReward = async () => {

        if (rewardToEdit) {
            const updatedReward = await editReward({ reward, rewardToUpdate: rewardToEdit.rewardName });

            if (updatedReward) {
                onRewardEdited(rewardToEdit, reward);
                onClose();
            }
        }
    };

    const onCreateReward = async (rewardToCreate: Reward) => {
        const createdReward = await createReward(rewardToCreate);

        if (createdReward) {
            onRewardCreated(createdReward);
            setConfirmingCreateMore(true);
        }
    };

    const onCreateMoreConfirmed = () => {
        setReward(defaultValues());
        setConfirmingCreateMore(false);
    };

    const onCreateMoreDeclined = () => {
        setReward(defaultValues());
        setConfirmingCreateMore(false);
        onClose();
    };

    return (
        <UserContext.Consumer>
            {({ user: loggedInUser }) =>
                <>
                    <Dialog
                        onClose={onClose}
                        open={rewardToEdit != undefined || open}
                        title={rewardToEdit ? 'Edit Reward' : 'Create New Reward'}
                    >
                        <DialogContent dividers>

                            <TextInput fullWidth required
                                label='Title'
                                variant='standard'
                                value={reward.rewardName}
                                onChange={e => setReward({ ...reward, rewardName: e.currentTarget.value })}
                            />

                            <TextInput fullWidth multiline
                                variant='standard'
                                label='Description'
                                value={reward.desc}
                                onChange={e => setReward({ ...reward, desc: e.currentTarget.value })}
                            />

                            <TextInput fullWidth required
                                type='number'
                                variant='standard'
                                label='Cost Points'
                                value={reward.points}
                                onChange={e => setReward({ ...reward, points: parseInt(e.currentTarget.value) })}
                            />

                            <FormControlLabel
                                label='Visible to everyone?'
                                control={
                                    <Checkbox
                                        checked={reward.visibleToEveryone}
                                        onChange={e => setReward({ ...reward, visibleToEveryone: e.target.checked })}
                                    />
                                }
                            />

                            {!reward.visibleToEveryone && <FormControl fullWidth >
                                <InputLabel>{'Visible to'}</InputLabel>

                                <Select
                                    disabled={reward.visibleToEveryone}
                                    multiple
                                    input={<Input />}
                                    renderValue={(userNames: any) => userNames.join(', ')}
                                    value={reward.visibleTo}
                                    onChange={e => setReward({ ...reward, visibleTo: e.target.value as string[] })}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'left'
                                        },
                                        transformOrigin: {
                                            vertical: 'top',
                                            horizontal: 'left'
                                        },
                                        getContentAnchorEl: null
                                    }}
                                >
                                    {users && users.map((user, key) =>
                                        <MenuItem
                                            key={key}
                                            value={user.userName}
                                            disabled={loggedInUser && loggedInUser.userName === user.userName}
                                        >
                                            <Checkbox
                                                checked={(loggedInUser && loggedInUser.userName === user.userName) || reward.visibleTo.indexOf(user.userName) >= 0}
                                            />
                                            <ListItemText primary={user.userName} />
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>}

                        </DialogContent>
                        <DialogActions >
                            <Button
                                label={rewardToEdit ? 'Save' : 'Create Reward'}
                                onClick={() => rewardToEdit ? onEditReward() : onCreateReward(reward)}
                            />
                        </DialogActions>
                    </Dialog>

                    <ConfirmDialog
                        open={confirmingCreateMore}
                        onClose={onCreateMoreDeclined}
                        onConfirm={onCreateMoreConfirmed}
                        title='Success!'
                    >
                        {'Do you want to create more rewards?'}
                    </ConfirmDialog>
                </>
            }
        </UserContext.Consumer>
    );
};

export default EditRewardDialog;
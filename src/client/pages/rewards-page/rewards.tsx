import styled, { css } from 'styled-components';
import React, { useState } from 'react';

import { TableContainer, TableHead, TableCell, Table, TableRow, TableBody } from '@material-ui/core';

import ConfirmDialog from '../../common/components/dialog/confirm-dialog';
import RedeemRewardDialog from './redeem-reward-dialog';

import { deleteReward, redeemReward } from '../../common/utils/api-operations';
import { subtractUserPoints } from '../../common/user/user-info';
import IconButton from '../../common/components/icon-button';
import EditRewardDialog from './edit-reward-dialog';

interface RewardsProps {
    onRewardDeleted: (reward: Reward) => void;
    onRewardCreated: (reward: Reward) => void;
    onRewardEdited: (oldReward: Reward, updatedReward: Reward) => void;
    rewards: Reward[];
}

const Rewards: React.FC<RewardsProps> = ({ rewards, onRewardCreated, onRewardEdited, onRewardDeleted }: RewardsProps) => {

    const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false);
    const [showCreateReward, setShowCreateReward] = useState<boolean>(false);
    const [selectedReward, setSelectedReward] = useState<Reward>();
    const [rewardToDelete, setRewardToDelete] = useState<Reward>();
    const [rewardToEdit, setRewardToEdit] = useState<Reward>();

    const onDeleteReward = (reward: Reward) => {
        setRewardToDelete(reward);
        setConfirmingDelete(true);
    };

    const onDeleteRewardConfirmed = async () => {
        if (rewardToDelete) {
            const deletedReward = await deleteReward({ rewardName: rewardToDelete.rewardName });

            if (deletedReward) {
                onRewardDeleted(deletedReward);
            }
        }
        onDialogClose();
    };

    const onRedeemReward = async (rewardToRedeem: Reward) => {
        try {
            const redeemedReward = await redeemReward({ rewardName: rewardToRedeem.rewardName });

            if (redeemedReward) {
                subtractUserPoints(rewardToRedeem.points);
                onDialogClose();
            }
        } catch (error) {
            onDialogClose();
            alert(error);
        }
    };

    const onDialogClose = () => {
        setRewardToEdit(undefined);
        setShowCreateReward(false);
        setSelectedReward(undefined);
        setConfirmingDelete(false);
    };

    return (
        <>
            <Container style={{ width: '90%' }}>
                <Table stickyHeader size='small'>
                    <TableHead>
                        <TableRow>

                            <TH padding='none' style={{ width: '25%' }}>
                                <SmallIconButton

                                    style={{ padding: '0px' }}
                                    onClick={() => setShowCreateReward(true)}
                                    icon='add'
                                />
                            </TH>

                            <TH style={{ width: '50%' }}>
                                Reward
                            </TH>

                            <TH style={{ width: '10%' }} align='right'>
                                Points
                            </TH>

                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {rewards.map((reward, key) => (

                            <BodyTR
                                key={key}
                                onClick={() => setSelectedReward(reward)}
                                style={{ cursor: 'pointer' }}
                                className={`${rewardToDelete && rewardToDelete.rewardName === reward.rewardName && 'deleting'} ${key % 2 ? 'odd' : 'even'}`}
                            >
                                <TableCell padding='none' style={{ minWidth: '20px' }}>
                                    <SmallIconButton
                                        onClick={e => { e.stopPropagation(); setRewardToEdit(reward); }}
                                        size='small'
                                        icon='edit'
                                    />

                                    <SmallIconButton
                                        onClick={e => { e.stopPropagation(); onDeleteReward(reward); }}
                                        size='small'
                                        icon='delete'
                                    />
                                </TableCell>

                                <TableCell
                                    size='small'
                                    padding='none'
                                >
                                    <h4>{reward.rewardName}</h4>
                                    <p>{reward.desc}</p>

                                </TableCell>

                                <TableCell
                                    align='right'
                                >
                                    {reward.points}
                                </TableCell>

                            </BodyTR>
                        ))}
                    </TableBody>
                </Table>
            </Container>

            <EditRewardDialog
                onRewardCreated={onRewardCreated}
                onClose={onDialogClose}
                onRewardEdited={onRewardEdited}
                open={showCreateReward}
                rewardToEdit={rewardToEdit}
            />

            <RedeemRewardDialog
                onClose={onDialogClose}
                reward={selectedReward}
                onRedeemReward={onRedeemReward}
            />

            <ConfirmDialog
                open={confirmingDelete}
                onClose={onDialogClose}
                onConfirm={onDeleteRewardConfirmed}
            >
                {`Are you sure you want to delete ${rewardToDelete?.rewardName}?`}
            </ConfirmDialog>
        </>
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

const SmallIconButton = styled(IconButton)`
    padding: 0px;
`;

const Container = styled(TableContainer)`
&& {
    min-height: 250px;
}
`;

export default Rewards;
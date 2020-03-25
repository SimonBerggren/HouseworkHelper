import React from 'react';

import { DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import Dialog from '../../common/components/dialog/dialog';
import Button from '../../common/components/button';

type RedeemRewardDialogProps = {
    reward?: Reward;
    onClose: () => void;
    onRedeemReward: (rewardToRedeem: Reward) => void;
}

const RedeemRewardDialog: React.FC<RedeemRewardDialogProps> = ({ reward, onClose, onRedeemReward }: RedeemRewardDialogProps) => {

    return (
        <Dialog
            onClose={onClose}
            title={reward?.rewardName}
            open={reward !== undefined}
        >
            <DialogContent dividers>

                <DialogContentText>
                    {reward?.desc || ''}
                </DialogContentText>

            </DialogContent>
            <DialogActions>

                <Button
                    onClick={() => reward && onRedeemReward(reward)}
                    color='primary'
                    label='Redeem'
                />

            </DialogActions>
        </Dialog>
    );
};

export default RedeemRewardDialog;
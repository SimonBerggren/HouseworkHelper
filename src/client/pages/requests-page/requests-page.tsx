import React, { useState } from 'react';

import RequestDialog from './request-dialog';

import { PageWrapper } from '../../common/utils/page-wrapper';
import Button from '../../common/components/button';


const RequestsPage: React.FC = () => {

    const [showRequestDialog, setShowRequestDialog] = useState<boolean>(false);


    const onRequestCreated = () => {

    };

    return (
        <PageWrapper>

            <Button
                label='Make a request'
                onClick={() => setShowRequestDialog(true)}
            />

            <RequestDialog
                onRequestCreate={onRequestCreated}
                open={showRequestDialog}
                onClose={() => setShowRequestDialog(false)}
            />
        </PageWrapper>
    );
};

export default RequestsPage;
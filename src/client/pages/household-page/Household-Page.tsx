import React, { useEffect, useState } from 'react';

import PageWrapper from '../../common/page-wrapper/page-wrapper';
import Link from '../../common/link/link';

import { deauthenticate } from '../../app/authentication';
import { get } from '../../api/api';

const HouseholdPage: React.FC = () => {

    const [household, setHousehold] = useState<Household>();

    useEffect(() => {
        get('household')
            .then(household => setHousehold(household))
            .catch(error => console.error(error));
    }, []);

    return (
        <PageWrapper>
            {household && <div>

                <h1>{household.name}</h1>

                <Link
                    to='/'
                    onClick={() => deauthenticate()}
                >
                    Log out
                </Link>

            </div>}
        </PageWrapper>
    );
};

export default HouseholdPage;
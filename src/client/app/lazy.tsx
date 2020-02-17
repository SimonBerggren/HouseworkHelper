import React, { useState, useEffect } from 'react';
import LoadingPage from '../pages/loading-page';

interface Props {
    importFunc: () => Promise<any>;
}

const Lazy: React.FC<Props> = ({ importFunc }: Props) => {

    const [component, setComponent] = useState<any>();

    useEffect(() => {
        importFunc().then(component => setComponent(component));
    }, []);

    return (
        <>
            {
                component ? component.default() : <LoadingPage />
            }
        </>
    );
};

export default Lazy;
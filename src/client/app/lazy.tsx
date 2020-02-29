import React, { useState, useEffect } from 'react';

interface LazyProps {
    importFunc: () => Promise<any>;
}

const LazyWrapper = ({ path }: { path: any }) => path.default();

const Lazy: React.FC<LazyProps> = ({ importFunc }: LazyProps) => {

    const [component, setComponent] = useState<any>();

    useEffect(() => {
        importFunc().then(component => setComponent(component));
    }, []);

    return (
        <>
            {
                component ? <LazyWrapper path={component} /> : <></>
            }
        </>
    );
};

export default Lazy;
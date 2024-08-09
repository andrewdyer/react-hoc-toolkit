import React from 'react';

const withLogger = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => {
        React.useEffect(() => {
            console.log('Props:', props);
        }, [props]);

        return <Component {...props} />;
    };
};

export default withLogger;

import React from 'react';

const composeHOCs = <P extends object>(
    ...hocs: Array<(Component: React.ComponentType<P>) => React.ComponentType<P>>
) => {
    return (Component: React.ComponentType<P>) => {
        return hocs.reduceRight((WrappedComponent, hoc) => hoc(WrappedComponent), Component);
    };
};

export default composeHOCs;

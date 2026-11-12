import { useEffect } from 'react';
import type * as React from 'react';

const withLogger = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    useEffect(() => {
      console.log('Props:', props);
    }, [props]);

    return <Component {...props} />;
  };
};

export default withLogger;

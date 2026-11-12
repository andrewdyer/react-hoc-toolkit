import { type ComponentType, useEffect } from 'react';

const withLogger = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    useEffect(() => {
      console.log('Props:', props);
    }, [props]);

    return <Component {...props} />;
  };
};

export default withLogger;

import type { ComponentType } from 'react';

const composeHOCs = <P extends object>(
  ...hocs: Array<(Component: ComponentType<P>) => ComponentType<P>>
) => {
  return (Component: ComponentType<P>) => {
    return hocs.reduceRight(
      (WrappedComponent, hoc) => hoc(WrappedComponent),
      Component
    );
  };
};

export default composeHOCs;

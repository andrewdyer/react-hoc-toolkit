import type * as React from 'react';

/**
 * Returns the name used to identify a component in React DevTools and error messages.
 *
 * @typeParam P - The props of the component, which do not affect its name.
 * @param WrappedComponent - The function or class component to name.
 * @returns The component's display name, its function or class name, or `'Component'` when it has neither.
 */
const getDisplayName = <P>(WrappedComponent: React.ComponentType<P>) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default getDisplayName;

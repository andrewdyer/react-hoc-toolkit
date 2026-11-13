/**
 * Returns the name used to identify a component in React DevTools and error messages.
 *
 * @param WrappedComponent - The component, or any object with an optional `displayName` or `name`.
 * @returns The component's display name, its function name, or `'Component'` when it has neither.
 */
const getDisplayName = (WrappedComponent: {
  displayName?: string;
  name?: string;
}) => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default getDisplayName;

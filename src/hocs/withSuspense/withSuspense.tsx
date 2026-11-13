import { Suspense } from 'react';
import type * as React from 'react';

import { getDisplayName } from '../../utils';

/**
 * Describes the options accepted by withSuspense.
 */
export interface WithSuspenseOptions {
  /**
   * The content rendered in place of the wrapped component while it, or anything it renders, is suspended.
   *
   * @remarks
   * When omitted, nothing is rendered while suspended.
   */
  fallback?: React.ReactNode;
}

/**
 * Creates a component that renders the given component inside a Suspense boundary, showing a fallback while it loads.
 *
 * @typeParam P - The props of the wrapped component, passed through unchanged.
 * @param WrappedComponent - The component whose suspended rendering the boundary handles, such as one that reads a promise with `use` or is created with `lazy`.
 * @param options - The fallback for the boundary. Defaults to rendering nothing while suspended.
 * @returns A component that accepts the same props and is named `withSuspense(<name>)`.
 *
 * @remarks
 * A rejected promise is thrown as an error rather than handled here, so pair it with {@link withErrorBoundary} placed outside it to show an error state.
 *
 * @example
 * ```tsx
 * const SuspendedProfile = withSuspense(Profile, {
 *   fallback: <p>Loading profile…</p>,
 * });
 * ```
 */
const withSuspense = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithSuspenseOptions = {}
) => {
  const WithSuspense = (props: P) => (
    <Suspense fallback={options.fallback}>
      <WrappedComponent {...props} />
    </Suspense>
  );

  WithSuspense.displayName = `withSuspense(${getDisplayName(WrappedComponent)})`;

  return WithSuspense;
};

export default withSuspense;

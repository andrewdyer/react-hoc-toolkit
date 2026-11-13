import { Profiler } from 'react';
import type * as React from 'react';

import { getDisplayName } from '../../utils';

/**
 * Describes the options accepted by withProfiler.
 */
export interface WithProfilerOptions {
  /**
   * The identifier passed to {@link WithProfilerOptions.onRender} to tell this profiled tree apart from others.
   *
   * @remarks
   * When omitted, the wrapped component's display name is used, falling back to its function or class name.
   */
  id?: string;

  /**
   * Called when the wrapped component, or anything it renders, commits an update, with timing for that render.
   *
   * @remarks
   * Only called in development and in React's profiling build, not in the standard production build.
   */
  onRender: React.ProfilerOnRenderCallback;
}

/**
 * Creates a component that renders the given component inside a React Profiler, reporting how long each render takes.
 *
 * @typeParam P - The props of the wrapped component, passed through unchanged.
 * @param WrappedComponent - The component whose renders are measured.
 * @param options - The identifier and render callback for the profiler.
 * @returns A component that accepts the same props and is named `withProfiler(<name>)`.
 *
 * @remarks
 * Profiling adds some overhead, so it is best applied to the components being investigated rather than left on throughout an application.
 *
 * @example
 * ```tsx
 * const ProfiledList = withProfiler(List, {
 *   onRender: (id, phase, actualDuration) =>
 *     console.log(id, phase, actualDuration),
 * });
 * ```
 */
const withProfiler = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithProfilerOptions
) => {
  const id = options.id ?? getDisplayName(WrappedComponent);

  const WithProfiler = (props: P) => (
    <Profiler id={id} onRender={options.onRender}>
      <WrappedComponent {...props} />
    </Profiler>
  );

  WithProfiler.displayName = `withProfiler(${getDisplayName(WrappedComponent)})`;

  return WithProfiler;
};

export default withProfiler;

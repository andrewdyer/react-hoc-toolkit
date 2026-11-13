import { Component } from 'react';
import type * as React from 'react';

import { getDisplayName } from '../../utils';

/**
 * Describes the arguments passed to a {@link WithErrorBoundaryOptions.fallback} render function.
 */
export interface FallbackRenderProps {
  /**
   * The value thrown while rendering the wrapped component, which is not guaranteed to be an `Error`.
   */
  error: unknown;

  /**
   * Called when the fallback wants to retry, clearing the caught error so the wrapped component renders again with its current props.
   */
  reset: () => void;
}

/**
 * Describes the options accepted by withErrorBoundary.
 */
export interface WithErrorBoundaryOptions {
  /**
   * The content rendered in place of the wrapped component after it throws, either as a node or as a function that receives {@link FallbackRenderProps}.
   *
   * @remarks
   * When omitted or `null`, nothing is rendered once an error is caught.
   */
  fallback?:
    React.ReactNode | ((props: FallbackRenderProps) => React.ReactNode);

  /**
   * Called when the wrapped component throws, once for each caught error, so it can be reported or logged.
   *
   * @param info - The React error details, including the component stack.
   *
   * @remarks
   * React also passes every caught error to the root's `onCaughtError` handler, which logs it with `console.error` by default, whether or not this is set.
   */
  onError?: (error: unknown, info: React.ErrorInfo) => void;
}

/**
 * Describes the props accepted by ErrorBoundary.
 */
interface ErrorBoundaryProps extends WithErrorBoundaryOptions {
  /**
   * The content rendered while no error has been caught.
   */
  children: React.ReactNode;
}

/**
 * Describes the internal state of ErrorBoundary.
 */
type ErrorBoundaryState =
  | {
      /**
       * Whether an error has been caught and the fallback is shown.
       */
      didCatch: false;
    }
  | {
      /**
       * Whether an error has been caught and the fallback is shown.
       */
      didCatch: true;

      /**
       * The value thrown by a descendant, kept so the fallback can display it.
       */
      error: unknown;
    };

/**
 * The state of a boundary that has not caught an error, used initially and after a reset.
 */
const INITIAL_STATE: ErrorBoundaryState = { didCatch: false };

/**
 * Renders its children, or a fallback once a descendant throws during rendering.
 *
 * @remarks
 * Error boundaries must be class components because React only exposes `getDerivedStateFromError` and `componentDidCatch` on classes.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * The boundary's current error state, starting without an error.
   */
  state: ErrorBoundaryState = INITIAL_STATE;

  /**
   * Returns the state that switches the boundary to its fallback.
   *
   * @param error - The value thrown by a descendant.
   * @returns The state recording the caught error.
   */
  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { didCatch: true, error };
  }

  /**
   * Handles a caught error by passing it to {@link WithErrorBoundaryOptions.onError}, if provided.
   *
   * @param error - The value thrown by a descendant.
   * @param info - The React error details, including the component stack.
   */
  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  /**
   * Handles a reset request by clearing the caught error so the children render again.
   */
  reset = () => {
    this.setState(INITIAL_STATE);
  };

  /**
   * Renders the children, or the fallback while an error is held.
   *
   * @returns The children or the fallback content.
   */
  render() {
    if (!this.state.didCatch) {
      return this.props.children;
    }

    const { fallback = null } = this.props;

    if (typeof fallback === 'function') {
      return fallback({ error: this.state.error, reset: this.reset });
    }

    return fallback;
  }
}

/**
 * Creates a component that renders the given component inside an error boundary, showing a fallback if it throws.
 *
 * @typeParam P - The props of the wrapped component, passed through unchanged.
 * @param WrappedComponent - The component whose rendering errors the boundary catches.
 * @param options - The fallback and error callback for the boundary. Defaults to rendering nothing and reporting nothing.
 * @returns A component that accepts the same props and is named `withErrorBoundary(<name>)`.
 *
 * @remarks
 * Like any React error boundary, it only catches errors thrown while rendering, in lifecycle methods, and in constructors of the wrapped tree, not in event handlers or asynchronous code.
 *
 * @example
 * ```tsx
 * const SafeWidget = withErrorBoundary(Widget, {
 *   fallback: ({ reset }) => <button onClick={reset}>Try again</button>,
 *   onError: (error, info) => report(error, info),
 * });
 * ```
 */
const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
) => {
  const WithErrorBoundary = (props: P) => (
    <ErrorBoundary fallback={options.fallback} onError={options.onError}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundary.displayName = `withErrorBoundary(${getDisplayName(WrappedComponent)})`;

  return WithErrorBoundary;
};

export default withErrorBoundary;

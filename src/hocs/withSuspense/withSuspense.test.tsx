import { act, render, screen } from '@testing-library/react';
import { lazy, use } from 'react';

import composeHOCs from '../composeHOCs';
import withErrorBoundary from '../withErrorBoundary';
import withSuspense from './withSuspense';

interface MessageProps {
  message: Promise<string>;
}

const Message = ({ message }: MessageProps) => <p>{use(message)}</p>;

const createDeferred = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};

describe('withSuspense', () => {
  test('should render the fallback while the component is suspended', async () => {
    const { promise } = createDeferred<string>();
    const Suspended = withSuspense(Message, { fallback: <p>Loading…</p> });

    await act(async () => {
      render(<Suspended message={promise} />);
    });

    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  test('should render the component once it resolves', async () => {
    const { promise, resolve } = createDeferred<string>();
    const Suspended = withSuspense(Message, { fallback: <p>Loading…</p> });

    await act(async () => {
      render(<Suspended message={promise} />);
    });

    await act(async () => {
      resolve('Hello, World!');
    });

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    expect(screen.queryByText('Loading…')).not.toBeInTheDocument();
  });

  test('should render nothing while suspended when no fallback is given', async () => {
    const { promise } = createDeferred<string>();
    const Suspended = withSuspense(Message);

    let container!: HTMLElement;

    await act(async () => {
      ({ container } = render(<Suspended message={promise} />));
    });

    expect(container).toBeEmptyDOMElement();
  });

  test('should support components created with lazy', async () => {
    const { promise, resolve } = createDeferred<{
      default: (props: { name: string }) => React.JSX.Element;
    }>();
    const Suspended = withSuspense(
      lazy(() => promise),
      { fallback: <p>Loading…</p> }
    );

    await act(async () => {
      render(<Suspended name="World" />);
    });

    expect(screen.getByText('Loading…')).toBeInTheDocument();

    await act(async () => {
      resolve({ default: ({ name }) => <p>Hello, {name}!</p> });
    });

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('should pass props through untouched', () => {
    const Spy = vi.fn((props: { a: number; b: string }) => <p>{props.b}</p>);
    const Suspended = withSuspense(Spy);

    render(<Suspended a={1} b="two" />);

    expect(Spy).toHaveBeenCalledWith({ a: 1, b: 'two' }, undefined);
  });

  test('should set a descriptive displayName', () => {
    expect(withSuspense(Message).displayName).toBe('withSuspense(Message)');
  });

  test('should let an outer error boundary handle a rejected promise', async () => {
    const originalError = console.error;
    console.error = vi.fn();

    const { promise, reject } = createDeferred<string>();
    const enhance = composeHOCs<MessageProps>(
      (Component) =>
        withErrorBoundary(Component, { fallback: <p>Failed to load</p> }),
      (Component) => withSuspense(Component, { fallback: <p>Loading…</p> })
    );
    const Safe = enhance(Message);

    await act(async () => {
      render(<Safe message={promise} />);
    });

    expect(screen.getByText('Loading…')).toBeInTheDocument();

    await act(async () => {
      reject(new Error('Network error'));
    });

    expect(screen.getByText('Failed to load')).toBeInTheDocument();

    console.error = originalError;
  });
});

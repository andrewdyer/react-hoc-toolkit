import { fireEvent, render, screen } from '@testing-library/react';

import composeHOCs from '../composeHOCs';
import withErrorBoundary from './withErrorBoundary';

interface MessageProps {
  message: string;
  shouldThrow?: boolean;
}

const Message = ({ message, shouldThrow = false }: MessageProps) => {
  if (shouldThrow) {
    throw new Error('Boom');
  }

  return <p>{message}</p>;
};

const originalError = console.error;

describe('withErrorBoundary', () => {
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  test('should render the wrapped component with its props when nothing throws', () => {
    const Safe = withErrorBoundary(Message, { fallback: <p>Fallback</p> });

    render(<Safe message="Hello, World!" />);

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    expect(screen.queryByText('Fallback')).not.toBeInTheDocument();
  });

  test('should pass props through untouched', () => {
    const Spy = vi.fn((props: { a: number; b: string }) => <p>{props.b}</p>);
    const Safe = withErrorBoundary(Spy);

    render(<Safe a={1} b="two" />);

    expect(Spy).toHaveBeenCalledWith({ a: 1, b: 'two' }, undefined);
  });

  test('should render a node fallback when the component throws', () => {
    const Safe = withErrorBoundary(Message, {
      fallback: <p>Something went wrong.</p>,
    });

    render(<Safe message="Hello" shouldThrow />);

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  test('should render nothing when no fallback is given', () => {
    const Safe = withErrorBoundary(Message);

    const { container } = render(<Safe message="Hello" shouldThrow />);

    expect(container).toBeEmptyDOMElement();
  });

  test('should pass the error to a fallback render function', () => {
    const Safe = withErrorBoundary(Message, {
      fallback: ({ error }) => <p>{(error as Error).message}</p>,
    });

    render(<Safe message="Hello" shouldThrow />);

    expect(screen.getByText('Boom')).toBeInTheDocument();
  });

  test('should call onError with the error and component stack', () => {
    const onError = vi.fn();
    const Safe = withErrorBoundary(Message, { onError });

    render(<Safe message="Hello" shouldThrow />);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Boom' }),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });

  test('should render the component again after reset', () => {
    let shouldThrow = true;

    const Flaky = ({ message }: { message: string }) => {
      if (shouldThrow) {
        throw new Error('Boom');
      }

      return <p>{message}</p>;
    };

    const Safe = withErrorBoundary(Flaky, {
      fallback: ({ reset }) => (
        <button type="button" onClick={reset}>
          Try again
        </button>
      ),
    });

    render(<Safe message="Recovered" />);

    shouldThrow = false;
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(screen.getByText('Recovered')).toBeInTheDocument();
  });

  test('should set a descriptive displayName', () => {
    expect(withErrorBoundary(Message).displayName).toBe(
      'withErrorBoundary(Message)'
    );
  });

  test('should prefer an existing displayName and fall back to Component', () => {
    const Named = () => null;
    Named.displayName = 'CustomName';

    expect(withErrorBoundary(Named).displayName).toBe(
      'withErrorBoundary(CustomName)'
    );
    expect(withErrorBoundary(() => null).displayName).toBe(
      'withErrorBoundary(Component)'
    );
  });

  test('should compose with composeHOCs', () => {
    const enhance = composeHOCs<MessageProps>((Component) =>
      withErrorBoundary(Component, { fallback: <p>Composed fallback</p> })
    );
    const Safe = enhance(Message);

    render(<Safe message="Hello" shouldThrow />);

    expect(screen.getByText('Composed fallback')).toBeInTheDocument();
  });
});

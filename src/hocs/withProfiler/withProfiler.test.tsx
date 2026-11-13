import { render, screen } from '@testing-library/react';

import composeHOCs from '../composeHOCs';
import withLogger from '../withLogger';
import withProfiler from './withProfiler';

interface MessageProps {
  message: string;
}

const Message = ({ message }: MessageProps) => <p>{message}</p>;

describe('withProfiler', () => {
  test('should render the wrapped component', () => {
    const Profiled = withProfiler(Message, { onRender: vi.fn() });

    render(<Profiled message="Hello, World!" />);

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('should call onRender with the mount phase on first render', () => {
    const onRender = vi.fn();
    const Profiled = withProfiler(Message, { onRender });

    render(<Profiled message="Hello" />);

    expect(onRender).toHaveBeenCalledTimes(1);
    expect(onRender).toHaveBeenCalledWith(
      'Message',
      'mount',
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number)
    );
  });

  test('should call onRender with the update phase when props change', () => {
    const onRender = vi.fn();
    const Profiled = withProfiler(Message, { onRender });

    const { rerender } = render(<Profiled message="Hello" />);
    rerender(<Profiled message="Goodbye" />);

    expect(onRender).toHaveBeenCalledTimes(2);
    expect(onRender).toHaveBeenLastCalledWith(
      'Message',
      'update',
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number)
    );
  });

  test('should use the given id instead of the display name', () => {
    const onRender = vi.fn();
    const Profiled = withProfiler(Message, { id: 'Greeting', onRender });

    render(<Profiled message="Hello" />);

    expect(onRender).toHaveBeenCalledWith(
      'Greeting',
      'mount',
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number)
    );
  });

  test('should pass props through untouched', () => {
    const Spy = vi.fn((props: { a: number; b: string }) => <p>{props.b}</p>);
    const Profiled = withProfiler(Spy, { onRender: vi.fn() });

    render(<Profiled a={1} b="two" />);

    expect(Spy).toHaveBeenCalledWith({ a: 1, b: 'two' }, undefined);
  });

  test('should set a descriptive displayName', () => {
    expect(withProfiler(Message, { onRender: vi.fn() }).displayName).toBe(
      'withProfiler(Message)'
    );
  });

  test('should compose with composeHOCs', () => {
    const originalLog = console.log;
    console.log = vi.fn();

    const onRender = vi.fn();
    const enhance = composeHOCs<MessageProps>(
      (Component) => withProfiler(Component, { onRender }),
      withLogger
    );
    const Enhanced = enhance(Message);

    render(<Enhanced message="Hello" />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(onRender).toHaveBeenCalledWith(
      expect.any(String),
      'mount',
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number)
    );

    console.log = originalLog;
  });
});

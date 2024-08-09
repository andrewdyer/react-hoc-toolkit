import React from 'react';
import { render } from '@testing-library/react';
import withLogger from './withLogger';

const originalLog = console.log;

const MockComponent = ({ message }: { message: string }) => <div>{message}</div>;

const WrappedComponent = withLogger(MockComponent);

describe('withLogger', () => {
    beforeAll(() => {
        console.log = jest.fn();
    });

    afterAll(() => {
        console.log = originalLog;
    });

    test('should log props when component is rendered', () => {
        render(<WrappedComponent message="Hello, World!" />);

        expect(console.log).toHaveBeenCalledWith('Props:', { message: 'Hello, World!' });
    });
});

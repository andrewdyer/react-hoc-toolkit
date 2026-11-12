import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';

import composeHOCs from './composeHOCs';

const withTestProp =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => <Component {...props} testProp="testValue" />;

const withAnotherTestProp =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => <Component {...props} anotherTestProp="anotherTestValue" />;

interface TestComponentProps {
  testProp?: string;
  anotherTestProp?: string;
}

interface OrderedTestComponentProps extends TestComponentProps {
  hoc1?: string;
  hoc2?: string;
}

const TestComponent = ({ testProp, anotherTestProp }: TestComponentProps) => (
  <div>
    <span>{testProp}</span>
    <span>{anotherTestProp}</span>
  </div>
);

const ComposedComponent = composeHOCs(
  withTestProp,
  withAnotherTestProp
)(TestComponent);

describe('composeHOCs', () => {
  test('should correctly composes multiple HOCs and passes props', () => {
    render(<ComposedComponent />);

    expect(screen.getByText('testValue')).toBeInTheDocument();
    expect(screen.getByText('anotherTestValue')).toBeInTheDocument();
  });

  test('should apply HOCs in the correct order', () => {
    const hoc1 = vi.fn(
      (Component: ComponentType<OrderedTestComponentProps>) =>
        (props: OrderedTestComponentProps) => (
          <Component {...props} hoc1="hoc1Value" />
        )
    );

    const hoc2 = vi.fn(
      (Component: ComponentType<OrderedTestComponentProps>) =>
        (props: OrderedTestComponentProps) => (
          <Component {...props} hoc2="hoc2Value" />
        )
    );

    const ComposedComponentWithMocks = composeHOCs(hoc1, hoc2)(TestComponent);

    render(<ComposedComponentWithMocks />);

    expect(hoc1).toHaveBeenCalled();
    expect(hoc2).toHaveBeenCalled();
  });
});

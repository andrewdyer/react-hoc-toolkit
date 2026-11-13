import { Component } from 'react';

import getDisplayName from './getDisplayName';

describe('getDisplayName', () => {
  test('should prefer displayName over the function name', () => {
    const Greeting = () => null;
    Greeting.displayName = 'CustomGreeting';

    expect(getDisplayName(Greeting)).toBe('CustomGreeting');
  });

  test('should fall back to the function name', () => {
    const Greeting = () => null;

    expect(getDisplayName(Greeting)).toBe('Greeting');
  });

  test('should use the class name for class components', () => {
    class Greeting extends Component {
      render() {
        return null;
      }
    }

    expect(getDisplayName(Greeting)).toBe('Greeting');
  });

  test("should return 'Component' when there is no name", () => {
    const [anonymous] = [() => null];

    expect(anonymous.name).toBe('');
    expect(getDisplayName(anonymous)).toBe('Component');
  });
});

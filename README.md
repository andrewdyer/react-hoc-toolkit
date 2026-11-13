# React HOC Toolkit

A higher-order component library for React applications that adds reusable, composable behaviour to components without altering them.

## Introduction

This library provides small, typed higher-order components that each accept a component and return an enhanced one with the same props, adding behaviour around it without changing its implementation. Because every enhancer shares this shape, any number of them can be folded into a single enhancer and applied in a predictable order, keeping cross-cutting concerns out of component code. Each is exported by name from the package entry point, so unused ones are left out of application bundles.

## Prerequisites

- **[React](https://react.dev/)**: Version 19.2 or later, together with React DOM, installed as peer dependencies.

## Installation

```bash
npm install react-hoc-toolkit
```

```bash
yarn add react-hoc-toolkit
```

```bash
pnpm add react-hoc-toolkit
```

## Usage

Each export is described below with a minimal example of its use.

### withErrorBoundary

`withErrorBoundary` wraps a component in an error boundary so that an error thrown while it renders shows a fallback instead of unmounting the whole tree. The `fallback` option can be a node, or a function that receives the error and a `reset` callback which renders the component again. The optional `onError` callback receives each caught error and React's error info for reporting.

```tsx
import { withErrorBoundary } from 'react-hoc-toolkit';

const SafeWidget = withErrorBoundary(Widget, {
  fallback: ({ reset }) => (
    <button type="button" onClick={reset}>
      Try again
    </button>
  ),
  onError: (error, info) => report(error, info),
});
```

### withLogger

`withLogger` logs the props of the wrapped component to the console after the first render and whenever the props change.

```tsx
import { withLogger } from 'react-hoc-toolkit';

const Greeting = ({ message }: { message: string }) => <p>{message}</p>;

const LoggedGreeting = withLogger(Greeting);

const App = () => <LoggedGreeting message="Hello, world!" />;
```

### composeHOCs

`composeHOCs` combines several higher-order components into one enhancer. They are applied from right to left, so the first argument wraps all the others. A higher-order component that takes options, such as `withErrorBoundary`, is passed as a function that supplies them.

```tsx
import { composeHOCs, withErrorBoundary, withLogger } from 'react-hoc-toolkit';

type GreetingProps = { message: string };

const Greeting = ({ message }: GreetingProps) => <p>{message}</p>;

const enhance = composeHOCs<GreetingProps>(
  (Component) => withErrorBoundary(Component, { fallback: <p>Unavailable</p> }),
  withLogger
);

const EnhancedGreeting = enhance(Greeting);
```

## License

Licensed under the [MIT License](LICENSE).

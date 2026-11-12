![React HOC Toolkit](https://public-assets.andrewdyer.rocks/images/covers/react-hoc-toolkit.png)

# React HOC Toolkit

A higher-order component library for React applications that composes multiple HOCs into one and logs component props for debugging.

## Introduction

This library provides small, typed utilities for working with higher-order components. Composition folds a list of higher-order components into a single enhancer, applying them from right to left so that the first one listed becomes the outermost wrapper. Logging wraps a component and writes its props to the console after render whenever they change, giving visibility of the data flowing through it without altering its output.

## Prerequisites

- **[React](https://react.dev/)**: Version 19.2 or later, together with React DOM, installed as peer dependencies.
- **[Node.js](https://nodejs.org/)**: Version 24.19.0 or later, as specified by the package `engines` field.

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

## Getting Started

Import the required higher-order components from the package entry point.

1. Import a utility by name:

   ```tsx
   import { composeHOCs, withLogger } from 'react-hoc-toolkit';
   ```

2. Apply it to an existing component and render the enhanced result in its place:

   ```tsx
   const Greeting = ({ message }: { message: string }) => <p>{message}</p>;

   const LoggedGreeting = withLogger(Greeting);
   ```

## Usage

Each utility accepts a component and returns an enhanced component with the same props.

### composeHOCs

`composeHOCs` combines several higher-order components into one enhancer. They are applied from right to left, so the first argument wraps all the others.

```tsx
import { composeHOCs, withLogger } from 'react-hoc-toolkit';

type GreetingProps = { message: string };

const Greeting = ({ message }: GreetingProps) => <p>{message}</p>;

const enhance = composeHOCs<GreetingProps>(withLogger, withTheme);

const EnhancedGreeting = enhance(Greeting);
```

Here `withTheme` stands for any other higher-order component with a matching props type.

### withLogger

`withLogger` logs the props of the wrapped component to the console after the first render and whenever the props change.

```tsx
import { withLogger } from 'react-hoc-toolkit';

const Greeting = ({ message }: { message: string }) => <p>{message}</p>;

const LoggedGreeting = withLogger(Greeting);

const App = () => <LoggedGreeting message="Hello, world!" />;
```

## License

Licensed under the [MIT License](LICENSE).

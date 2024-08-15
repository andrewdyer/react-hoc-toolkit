# React HOC Toolkit

A collection of Higher-Order Components (HOCs) designed to enhance and simplify the development of React applications.

## License

Licensed under MIT. Totally free for private or commercial projects.

## Getting Started

To install this package use npm:

```bash
npm install react-hoc-toolkit
```

## Usage

### withLogger

The `withLogger` Higher-Order Component (HOC) enhances your React components by logging their props and state changes. This is particularly useful for debugging and understanding the flow of data through your application:

```tsx
import React from 'react';
import { withLogger } from 'react-hoc-toolkit';

interface MyComponentProps {
    message: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ message }) => {
    return <div>{message}</div>;
};

const MyComponentWithLogger = withLogger(MyComponent);

const App: React.FC = () => {
    return <MyComponentWithLogger message="Hello, World!" />;
};

export default App;
```

In this example, `withLogger` is used to wrap `MyComponent`, which logs the props passed to it. When `App` renders `MyComponentWithLogger` with the message "Hello, World!", the props will be logged to the console.

### composeHOCs

The `composeHOCs` function allows you to compose multiple Higher-Order Components (HOCs) into a single HOC. This is useful when you want to apply multiple HOCs to a component in a clean and readable manner.

```tsx
import React from 'react';
import { composeHOCs, withLogger } from 'react-hoc-toolkit';

interface MyComponentProps {
    message: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ message }) => {
    return <div>{message}</div>;
};

const EnhancedComponent = composeHOCs(withLogger)(MyComponent);

const App: React.FC = () => {
    return <EnhancedComponent message="Hello, World!" />;
};

export default App;
```

In this example, `composeHOCs` is used to apply the `withLogger` HOC to `MyComponent`. You can pass multiple HOCs to `composeHOCs` to apply them in sequence.

## Local Development

For local development, use Yalc to install this package in your project.

Yalc is a tool for managing local development of npm packages. It allows you to work on this package locally and test it in other projects without publishing to the npm registry.

To use yalc, you need to install it globally on your machine. You can do this using npm:

```bash
npm install yalc -g
```

### Installing the Package with Yalc

First, navigate to the project directory where you want to use this package and run:

```bash
yalc add react-hoc-toolkit
```

This will install the package from the local Yalc store. You can now use it in the project as you would with any other npm package.

### Updating the Package with Yalc

After publishing changes to this package to the local Yalc store, navigate to the project directory and run:

```bash
yalc update react-hoc-toolkit
```

This will update the installed version of this package in the project.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds production files in your `dist/` folder. It generates CommonJS, ES Modules, as well as TypeScript declaration files.

### `npm run build:cjs`

Builds CommonJS (CJS) modules for the project.

### `npm run build:esm`

Builds ES Modules (ESM) for the project.

### `npm run build:types`

Generates TypeScript declaration files.

### `npm run clean`

Removes the `dist/` folder to ensure a clean build.

### `npm run format`

Formats the code using Prettier according to the rules defined in package.json.

### `npm run test`

Runs the test suite for the project using Jest.

### `npm run test:watch`

Runs the test suite in watch mode, re-running tests when files change.

### `npm run test:coverage`

Runs the test suite and generates a coverage report.

### `npm run yalc:publish`

Publishes the package to the local Yalc store for local development.

### `npm run yalc:push`

Publishes updates to the package in the local Yalc store and pushes the changes to linked projects.

## Publishing

This repository is configured to publish the package to npm, every time you publish a new release, using GitHub Actions.

### Creating and Using an npm Token

To publish the package, you need an npm token:

1. Log in to your npm account.
2. Navigate to Access Tokens in your npm account settings.
3. Generate a new token with the Automation option, especially if you have 2FA enabled.
4. Add the token to your GitHub repository secrets:
    - Go to Settings > Secrets and variables > Actions.
    - Add a new secret named `NPM_TOKEN` and paste your npm token.

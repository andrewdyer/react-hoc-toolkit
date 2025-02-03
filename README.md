# 🧰 React HOC Toolkit

A collection of HOCs to enhance and simplify React development.

## 📄 License

Licensed under the [MIT license](https://opensource.org/licenses/MIT) and is free for private or commercial projects.

## ✨ Introduction

React HOC Toolkit is a lightweight and easy-to-use library that provides a collection of useful Higher-Order Components (HOCs) for enhancing your React components.

## 📥 Installation

To install this package use npm:

```bash
npm install react-hoc-toolkit
```

## 📖 Usage

### withLogger

The `withLogger` Higher-Order Component (HOC) enhances your React components by logging their props and state changes. This is particularly useful for debugging and understanding the flow of data through your application:

```tsx
import React from 'react';
import { withLogger } from 'react-hoc-toolkit';

interface MyComponentProps {
    message: string;
}

const MyComponent = ({ message }: MyComponentProps) => {
    return <div>{message}</div>;
};

const MyComponentWithLogger = withLogger(MyComponent);

const App = () => {
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

const MyComponent = ({ message }: MyComponentProps) => {
    return <div>{message}</div>;
};

const EnhancedComponent = composeHOCs(withLogger)(MyComponent);

const App = () => {
    return <EnhancedComponent message="Hello, World!" />;
};

export default App;
```

In this example, `composeHOCs` is used to apply the `withLogger` HOC to `MyComponent`. You can pass multiple HOCs to `composeHOCs` to apply them in sequence.

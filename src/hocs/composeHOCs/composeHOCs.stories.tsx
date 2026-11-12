import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';

import composeHOCs from './composeHOCs';

interface GreetingProps {
  greeting?: string;
  name?: string;
}

const Greeting = ({ greeting = 'Hi', name = 'there' }: GreetingProps) => (
  <p>
    {greeting}, {name}!
  </p>
);

const withGreeting =
  (Component: ComponentType<GreetingProps>) => (props: GreetingProps) => (
    <Component greeting="Hello" {...props} />
  );

const withName =
  (Component: ComponentType<GreetingProps>) => (props: GreetingProps) => (
    <Component name="World" {...props} />
  );

const EnhancedGreeting = composeHOCs(withGreeting, withName)(Greeting);

const meta = {
  title: 'HOCs/composeHOCs',
  component: EnhancedGreeting,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EnhancedGreeting>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OverriddenProps: Story = {
  args: {
    greeting: 'Welcome',
    name: 'Storybook',
  },
};

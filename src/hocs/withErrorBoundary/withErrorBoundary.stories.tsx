import type { Meta, StoryObj } from '@storybook/react-vite';

import withErrorBoundary from './withErrorBoundary';

interface MessageProps {
  message: string;
  shouldThrow: boolean;
}

const Message = ({ message, shouldThrow }: MessageProps) => {
  if (shouldThrow) {
    throw new Error('Something went wrong.');
  }

  return <p>{message}</p>;
};

const MessageWithErrorBoundary = withErrorBoundary(Message, {
  fallback: ({ error }) => (
    <p role="alert">
      {error instanceof Error ? error.message : 'Unknown error'}
    </p>
  ),
});

const meta = {
  title: 'HOCs/withErrorBoundary',
  component: MessageWithErrorBoundary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    message: 'Hello, World!',
    shouldThrow: false,
  },
} satisfies Meta<typeof MessageWithErrorBoundary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    shouldThrow: true,
  },
};

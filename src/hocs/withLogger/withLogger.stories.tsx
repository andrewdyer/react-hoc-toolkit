import type { Meta, StoryObj } from '@storybook/react-vite';

import withLogger from './withLogger';

interface MessageProps {
  message: string;
}

const Message = ({ message }: MessageProps) => <p>{message}</p>;

const MessageWithLogger = withLogger(Message);

const meta = {
  title: 'HOCs/withLogger',
  component: MessageWithLogger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    message: 'Hello, World!',
  },
} satisfies Meta<typeof MessageWithLogger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/react-vite';

import withErrorBoundary from './withErrorBoundary';

/**
 * Describes the props accepted by Message.
 */
interface MessageProps {
  /**
   * The text shown in the paragraph while the component renders successfully.
   */
  message: string;

  /**
   * Whether the component throws during render, so the boundary's fallback is shown instead.
   */
  shouldThrow: boolean;
}

/**
 * Renders a message paragraph, or throws while rendering when asked to, to exercise the boundary.
 */
const Message = ({ message, shouldThrow }: MessageProps) => {
  if (shouldThrow) {
    throw new Error('Something went wrong.');
  }

  return <p>{message}</p>;
};

/**
 * Renders {@link Message} inside an error boundary whose fallback shows the thrown error's message as an alert.
 */
const MessageWithErrorBoundary = withErrorBoundary(Message, {
  fallback: ({ error }) => (
    <p role="alert">
      {error instanceof Error ? error.message : 'Unknown error'}
    </p>
  ),
});

/**
 * The Storybook metadata for withErrorBoundary, rendering a message that does not throw unless a story says so.
 */
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

/**
 * Describes a story for {@link MessageWithErrorBoundary}, typed from {@link meta}.
 */
type Story = StoryObj<typeof meta>;

/**
 * The wrapped component rendering normally, with the boundary passing its props through.
 */
export const Default: Story = {};

/**
 * The wrapped component throwing during render, with the boundary showing its fallback.
 */
export const WithError: Story = {
  args: {
    shouldThrow: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { use } from 'react';

import withSuspense from './withSuspense';

/**
 * The delay before {@link resolvedMessage} settles, in milliseconds, long enough for the fallback to be seen.
 */
const LOAD_DELAY_MS = 1500;

/**
 * A message that resolves after {@link LOAD_DELAY_MS}, created once so every render reads the same promise.
 */
const resolvedMessage = new Promise<string>((resolve) => {
  setTimeout(() => resolve('Hello, World!'), LOAD_DELAY_MS);
});

/**
 * A message that never settles, keeping the component suspended so the fallback stays visible.
 */
const pendingMessage = new Promise<string>(() => {});

/**
 * Describes the props accepted by Message.
 */
interface MessageProps {
  /**
   * Whether the message never loads, so the boundary's fallback is shown indefinitely.
   */
  pending: boolean;
}

/**
 * Renders a message read from a promise, suspending until it resolves.
 */
const Message = ({ pending }: MessageProps) => (
  <p>{use(pending ? pendingMessage : resolvedMessage)}</p>
);

/**
 * Renders {@link Message} inside a Suspense boundary whose fallback shows a loading notice.
 */
const MessageWithSuspense = withSuspense(Message, {
  fallback: <p role="status">Loading…</p>,
});

/**
 * The Storybook metadata for withSuspense, rendering a message that loads after a short delay unless a story says otherwise.
 */
const meta = {
  title: 'HOCs/withSuspense',
  component: MessageWithSuspense,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    pending: false,
  },
} satisfies Meta<typeof MessageWithSuspense>;

export default meta;

/**
 * Describes a story for {@link MessageWithSuspense}, typed from {@link meta}.
 */
type Story = StoryObj<typeof meta>;

/**
 * The wrapped component showing the fallback briefly, then the message once it loads.
 */
export const Default: Story = {};

/**
 * The wrapped component suspended indefinitely, with the boundary showing its fallback.
 */
export const Loading: Story = {
  args: {
    pending: true,
  },
};

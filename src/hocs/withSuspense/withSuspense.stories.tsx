import type { Meta, StoryObj } from '@storybook/react-vite';
import { use, useState } from 'react';

import withSuspense from './withSuspense';

/**
 * The delay before a loading message resolves, in milliseconds, long enough for the fallback to be seen.
 */
const LOAD_DELAY_MS = 1500;

/**
 * Creates the promise a story's message is read from, starting its delay when called.
 *
 * @param pending - Whether the promise never settles, keeping the component suspended.
 * @returns A promise that resolves after {@link LOAD_DELAY_MS}, or one that never settles when `pending` is `true`.
 */
const createMessage = (pending: boolean) =>
  new Promise<string>((resolve) => {
    if (!pending) {
      setTimeout(() => resolve('Hello, World!'), LOAD_DELAY_MS);
    }
  });

/**
 * Describes the props accepted by Message.
 */
interface MessageProps {
  /**
   * The promise whose resolved text is shown, suspending the component until it settles.
   */
  message: Promise<string>;
}

/**
 * Renders a message read from a promise, suspending until it resolves.
 */
const Message = ({ message }: MessageProps) => <p>{use(message)}</p>;

/**
 * Renders {@link Message} inside a Suspense boundary whose fallback shows a loading notice.
 */
const MessageWithSuspense = withSuspense(Message, {
  fallback: <p role="status">Loading…</p>,
});

/**
 * Describes the props accepted by MessageStory.
 */
interface MessageStoryProps {
  /**
   * Whether the message never loads, so the boundary's fallback is shown indefinitely.
   */
  pending: boolean;
}

/**
 * Renders {@link MessageWithSuspense} with a promise created when the story mounts, so the loading delay replays on every visit.
 *
 * @remarks
 * The promise is held in state outside the Suspense boundary, because state inside a suspended component is discarded before it first commits.
 */
const MessageStory = ({ pending }: MessageStoryProps) => {
  const [message] = useState(() => createMessage(pending));

  return <MessageWithSuspense message={message} />;
};

/**
 * The Storybook metadata for withSuspense, rendering a message that loads after a short delay unless a story says otherwise.
 *
 * @remarks
 * Each render is keyed by `pending`, so changing the control mounts a fresh story with a new promise.
 */
const meta = {
  title: 'HOCs/withSuspense',
  component: MessageStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    pending: false,
  },
  render: (args) => <MessageStory key={String(args.pending)} {...args} />,
} satisfies Meta<typeof MessageStory>;

export default meta;

/**
 * Describes a story for {@link MessageStory}, typed from {@link meta}.
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

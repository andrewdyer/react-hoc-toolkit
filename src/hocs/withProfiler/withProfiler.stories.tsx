import type { Meta, StoryObj } from '@storybook/react-vite';

import withProfiler from './withProfiler';

/**
 * Describes the props accepted by List.
 */
interface ListProps {
  /**
   * The number of items rendered, so larger values take measurably longer to render.
   */
  count: number;
}

/**
 * Renders a numbered list of the given length.
 */
const List = ({ count }: ListProps) => (
  <ol>
    {Array.from({ length: count }, (_, index) => (
      <li key={index}>Item {index + 1}</li>
    ))}
  </ol>
);

/**
 * Renders {@link List} inside a profiler that logs each render's phase and duration to the console.
 */
const ListWithProfiler = withProfiler(List, {
  onRender: (id, phase, actualDuration) =>
    console.log(`${id} ${phase} in ${actualDuration.toFixed(2)}ms`),
});

/**
 * The Storybook metadata for withProfiler, rendering a short list whose length can be changed to trigger update renders.
 */
const meta = {
  title: 'HOCs/withProfiler',
  component: ListWithProfiler,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    count: 5,
  },
} satisfies Meta<typeof ListWithProfiler>;

export default meta;

/**
 * Describes a story for {@link ListWithProfiler}, typed from {@link meta}.
 */
type Story = StoryObj<typeof meta>;

/**
 * The wrapped list rendering normally, with each render's timing logged to the console.
 */
export const Default: Story = {};

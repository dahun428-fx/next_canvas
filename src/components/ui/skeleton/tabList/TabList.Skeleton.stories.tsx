import { Meta, StoryObj } from '@storybook/react';
import { TabListSkeleton } from './TabList.Skeleton';

const meta = {
	component: TabListSkeleton,
} satisfies Meta<typeof TabListSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const _TabListSKeleton: Story = {};

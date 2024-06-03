import { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '.';

const meta = {
	component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const _Sidebar: Story = {
	args: {
		matchDownMd: false,
	},
};

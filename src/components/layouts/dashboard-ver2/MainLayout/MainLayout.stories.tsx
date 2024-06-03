import { Meta, StoryObj } from '@storybook/react';
import { Layout, MainLayoutProvider } from './MainLayout';

const meta = {
	component: Layout,
	decorators: [
		Story => (
			<MainLayoutProvider>
				<Story />
			</MainLayoutProvider>
		),
	],
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const _Layout: Story = {
	args: {},
};

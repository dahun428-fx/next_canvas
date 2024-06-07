import { Meta, StoryObj } from '@storybook/react';
import { PoliceItem } from './PoliceItem';

const meta = {
	component: PoliceItem,
} satisfies Meta<typeof PoliceItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const _PoliceItem: Story = {
	args: {
		dataObj: {
			a: 30,
			b: 20,
			c: 10,
		},
		subheader: 'subheader',
		title: 'title',
	},
};

import { Meta, StoryObj } from '@storybook/react';
import { Doughnut as DoughnutComponent } from './Doughnut';

const meta = {
	title: 'Chart/Dougnut',
	component: DoughnutComponent,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		dataObject: {
			a: 100,
			b: 50,
			c: 20,
		},
	},
} satisfies Meta<typeof DoughnutComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		chartName: '경찰청',
		dataObject: {
			a: 100,
			b: 50,
			c: 20,
			d: 10,
		},
		label: 'DougnutChart',
	},
};

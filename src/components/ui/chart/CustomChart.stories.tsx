import { Meta, StoryObj } from '@storybook/react';
import { CustomChart } from './CustomChart';
import { ChartType } from 'chart.js';

const ChartTypeKeys: ChartType[] = [
	'bar',
	'bubble',
	'doughnut',
	'line',
	'pie',
	'polarArea',
	'radar',
	'scatter',
];

const meta = {
	component: CustomChart,
	argTypes: {
		chartType: {
			options: ChartTypeKeys,
			control: {
				type: `select`,
			},
		},
		percentOff: {
			options: [true, false],
			control: {
				type: `select`,
			},
		},
		digitOff: {
			options: [true, false],
			control: {
				type: `select`,
			},
		},
		zoomOn: {
			options: [true, false],
			control: {
				type: `select`,
			},
		},
		labelPositon: {
			options: ['left', 'right', 'bottom', 'top'],
			control: {
				type: `select`,
			},
		},
	},
} satisfies Meta<typeof CustomChart>;
export default meta;

type Story = StoryObj<typeof meta>;

const doughnutData = { a: 10, b: 20, c: 70 };

export const _CustomChart: Story = {
	args: {
		chartLabels: Object.keys(doughnutData),
		chartType: 'doughnut',
		data: doughnutData,
		width: 300,
		height: 300,
		labelPositon: 'left',
		// digitOff: false,
		// percentOff: false,
	},
};

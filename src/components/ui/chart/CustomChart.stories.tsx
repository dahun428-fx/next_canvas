import { Meta, StoryObj } from '@storybook/react';
import { CustomChart, MultiChartDataType, MultiChartType } from './CustomChart';
import { ChartType } from 'chart.js';
import { ChartBox } from './chartBox';

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
const doughnutData = { a: 10, b: 20, c: 70 };
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
} satisfies Meta<typeof CustomChart>;
export default meta;

type Story = StoryObj<typeof meta>;

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

// const lineData = [{'a':[1,2,3,4,5]}, {'b'}];
const lineData: MultiChartDataType[] = [
	{ label: 'a', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
	{ label: 'b', data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] },
	{ label: 'c', data: [5, 3, 2, 1, 4, 6, 7, 8, 9, 10] },
];
const lineLabelData: string[] = ['a', 'b', 'c'];

export const _CustomChartMulti: Story = {
	args: {
		chartLabels: lineLabelData,
		chartType: 'line',
		data: lineData,
		width: 300,
		height: 300,
		labelPositon: 'left',
		// digitOff: false,
		// percentOff: false,
	},
};

export const _CustomChartCard: Story = {
	args: {
		..._CustomChart.args,
	},
	render: args => {
		return (
			<ChartBox
				title={`2022년도 범죄별 통계`}
				cardStyle={{
					margin: 2,
					textAlign: 'center',
				}}
				titleStyle={{
					margin: 2,
					textAlign: 'center',
				}}
				boxStyle={{
					height: '350px',
					display: 'flex',
					justifyContent: 'center',
				}}
				chartData={args}
			/>
		);
	},
};

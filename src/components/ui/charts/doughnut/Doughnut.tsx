import { isObject } from '@/utils/object';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
	BubbleDataPoint,
	ChartData,
	Chart as ChartJS,
	ChartType,
	ChartTypeRegistry,
	Point,
} from 'chart.js';
import { registerables } from 'chart.js/auto';
import { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import styles from './Doughnut.module.scss';
import { LinearScale } from 'chart.js';
import { Plugin } from 'chart.js';

ChartJS.register(...registerables);

export type DoughnutData = {
	[key: string]: number;
};

type Props = {
	className?: string;
	data: DoughnutData;
	chartName?: string;
	labels?: string[];
	title: string;
	colors?: string[];
	chartType?: ChartType;
	options?: object;
	plugins?: object;
};

export const Doughnut: React.FC<Props> = ({
	className,
	title,
	chartName,
	data,
	labels,
	colors,
	options,
	plugins,
	chartType = 'doughnut',
}) => {
	const chartDatas: number[] = Object.values(data);

	const dataLabel = useMemo(() => {
		if (labels && labels.length > 0) {
			return labels;
		}
		return Object.keys(data);
	}, [labels, data]);

	const defaultColor = useMemo(() => {
		return [
			'#FF6347',
			'#FFD700',
			'#40E0D0',
			'#9ACD32',
			'#00BFFF',
			'#FF4500',
			'#FF69B4',
			'#FFFF00',
			'#00FF00',
			'#1E90FF',
			'#8A2BE2',
			'#FFA500',
			'#FF1493',
			'#FF00FF',
			'#32CD32',
			'#00FFFF',
			'#FFDAB9',
			'#FFB6C1',
			'#FFA07A',
		];
	}, []);
	if (!isObject(data)) return null;

	return (
		<div className={className}>
			{chartName && <div className={styles.chartName}>{chartName}</div>}
			<Chart
				type={chartType}
				data={{
					labels: dataLabel,
					datasets: [
						{
							label: title,
							data: chartDatas,
							backgroundColor: defaultColor,
							borderColor: defaultColor,
						},
					],
				}}
				options={options ?? {}}
			/>
		</div>
	);
};

Doughnut.displayName = 'Doughnut';

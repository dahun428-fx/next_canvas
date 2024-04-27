import { isObject } from '@/utils/object';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Colors,
	ChartType,
	RadialLinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	plugins,
} from 'chart.js';
import { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import styles from './Doughnut.module.scss';
import { LinearScale } from 'chart.js';
import { Plugin } from 'chart.js';
import { ChartTypeRegistry } from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	RadialLinearScale,
	// ChartDataLabels,
	ArcElement,
	plugins,
	Title,
	Tooltip,
	Legend,
	Colors
);

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
	if (!isObject(data)) return null;

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

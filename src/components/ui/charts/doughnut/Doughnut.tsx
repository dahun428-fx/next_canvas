import { isObject } from '@/utils/object';
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
} from 'chart.js';
import { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import styles from './Doughnut.module.scss';
import { LinearScale } from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	RadialLinearScale,
	ArcElement,
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
};

export const Doughnut: React.FC<Props> = ({
	className,
	title,
	chartName,
	data,
	labels,
	colors,
	chartType = 'doughnut',
}) => {
	if (!isObject(data)) return null;

	const chartDatas: number[] = Object.values(data);

	const options = {};

	const dataLabel = useMemo(() => {
		if (labels && labels.length > 0) {
			return labels;
		}
		return Object.keys(data);
	}, [labels, data]);

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
						},
					],
				}}
				options={options}
			/>
		</div>
	);
};

Doughnut.displayName = 'Doughnut';

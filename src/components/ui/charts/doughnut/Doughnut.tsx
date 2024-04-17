import { isObject } from '@/utils/object';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Colors,
} from 'chart.js';
import { useMemo } from 'react';
import { Chart, Doughnut as DoughnutChart } from 'react-chartjs-2';
import styles from './Doughnut.module.scss';
import { digit } from '@/utils/number';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

/**
 * 강도 : 1, 절도 : 1, 살인 : 1, 폭력 : 1,
 */

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
};

export const Doughnut: React.FC<Props> = ({
	className,
	title,
	chartName,
	data,
	labels,
	colors,
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
			<DoughnutChart
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

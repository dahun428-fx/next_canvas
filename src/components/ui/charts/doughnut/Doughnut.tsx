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

export type DoughnutDataObject = {
	[key: string]: number;
};

type Props = {
	className?: string;
	dataObject: DoughnutDataObject;
	chartName?: string;
	label: string;
	colors?: string[];
};

export const Doughnut: React.FC<Props> = ({
	className,
	label,
	chartName,
	dataObject,
	colors,
}) => {
	if (!isObject(dataObject)) return null;
	const labels: string[] = Object.keys(dataObject);
	const chartDatas: number[] = Object.values(dataObject);

	const adjustLabels = useMemo(() => {
		const labels = Object.keys(dataObject);
		const chartDatas: number[] = Object.values(dataObject);

		let result = [];
		for (let i = 0; i < labels.length; i++) {
			const text = `${labels[i]} (${digit(chartDatas[i])})`;
			result.push(text);
		}
		return result;
	}, [dataObject]);

	const data = {
		labels: adjustLabels,
		datasets: [
			{
				label: label,
				data: chartDatas,
			},
		],
	};
	const options = {};
	return (
		<div className={className}>
			{chartName && <div className={styles.chartName}>{chartName}</div>}
			<DoughnutChart data={data} options={options} />
		</div>
	);
};

Doughnut.displayName = 'Doughnut';

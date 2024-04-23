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

	const getOrCreateLegendList = (chart, id: string) => {
		const legendContainer = document.getElementById(id);
		let listContainer = legendContainer.querySelector('ul');

		if (!listContainer) {
			listContainer = document.createElement('ul');
			listContainer.style.display = 'flex';
			listContainer.style.flexDirection = 'row';
			listContainer.style.margin = 0;
			listContainer.style.padding = 0;

			legendContainer.appendChild(listContainer);
		}

		return listContainer;
	};

	const htmlLegendPlugin: Plugin<keyof ChartTypeRegistry, any> = {
		id: 'htmlLegend',
		afterUpdate(chart, args, options) {
			const ul = getOrCreateLegendList(chart, options.containerID);

			// Remove old legend items
			while (ul.firstChild) {
				ul.firstChild.remove();
			}

			// Reuse the built-in legendItems generator
			const items =
				chart?.options?.plugins?.legend?.labels?.generateLabels(chart);
			if (!items || items.length < 1) return;

			items.forEach(item => {
				const li = document.createElement('li');
				li.style.alignItems = 'center';
				li.style.cursor = 'pointer';
				li.style.display = 'flex';
				li.style.flexDirection = 'row';
				li.style.marginLeft = '10px';

				li.onclick = () => {
					const { type } = chart.config;
					if (type === 'pie' || type === 'doughnut') {
						// Pie and doughnut charts only have a single dataset and visibility is per item
						chart.toggleDataVisibility(item.index);
					} else {
						chart.setDatasetVisibility(
							item.datasetIndex,
							!chart.isDatasetVisible(item.datasetIndex)
						);
					}
					chart.update();
				};

				// Color box
				const boxSpan = document.createElement('span');
				boxSpan.style.background = item.fillStyle;
				boxSpan.style.borderColor = item.strokeStyle;
				boxSpan.style.borderWidth = item.lineWidth + 'px';
				boxSpan.style.display = 'inline-block';
				boxSpan.style.flexShrink = 0;
				boxSpan.style.height = '20px';
				boxSpan.style.marginRight = '10px';
				boxSpan.style.width = '20px';

				// Text
				const textContainer = document.createElement('p');
				textContainer.style.color = item.fontColor;
				textContainer.style.margin = 0;
				textContainer.style.padding = 0;
				textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

				const text = document.createTextNode(item.text);
				textContainer.appendChild(text);

				li.appendChild(boxSpan);
				li.appendChild(textContainer);
				ul.appendChild(li);
			});
		},
	};

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
				options={options ?? {}}
				plugins={plugins ? [plugins] : []}
				// plugins={[plugins]}
			/>
		</div>
	);
};

Doughnut.displayName = 'Doughnut';

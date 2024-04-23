import { Doughnut } from '@/components/ui/charts/doughnut';
import { digit } from '@/utils/number';
import { RegionItem, changeToChartData } from '@/utils/openapi/region/region';
import { useEffect, useMemo } from 'react';

type Props = {
	data: RegionItem;
};

export const CrimeContent: React.FC<Props> = ({ data }) => {
	const adjustData = useMemo(() => {
		return changeToChartData(data.category);
	}, [data]);

	const adjustLabels = useMemo(() => {
		const labels: string[] = Object.keys(adjustData);
		const chartDatas: number[] = Object.values(adjustData);

		let result = [];
		for (let i = 0; i < labels.length; i++) {
			const text = `${labels[i]} (${digit(chartDatas[i])})`;
			result.push(text);
		}
		return result;
	}, [adjustData]);

	return (
		<div>
			<Doughnut
				labels={adjustLabels}
				data={adjustData}
				title={``}
				chartName={``}
				chartType="doughnut"
				options={{
					responsive: true,
					plugins: {
						legend: {
							display: true,
							position: 'bottom',
						},
					},
				}}
			/>
		</div>
	);
};

CrimeContent.displayName = 'CrimeContent';

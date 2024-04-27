import { CustomChart } from '@/components/common/utils/CustomChart';
import { Doughnut } from '@/components/ui/charts/doughnut';
import { DoughnutData } from '@/components/ui/charts/doughnut/Doughnut';
import { useSelector } from '@/store/hooks';
import { selectPoliceChartType } from '@/store/modules/common/police';
import { digit } from '@/utils/number';
import { useMemo } from 'react';

type Props = {
	data: DoughnutData;
	title: string;
	className?: string;
	chartName?: string;
	colors?: string[];
};

export const PoliceDougnut: React.FC<Props> = ({
	data,
	title,
	className,
	chartName,
	colors,
}) => {
	const chartType = useSelector(selectPoliceChartType);

	const adjustLabels = useMemo(() => {
		const labels: string[] = Object.keys(data);
		const chartDatas: number[] = Object.values(data);

		let result = [];
		for (let i = 0; i < labels.length; i++) {
			const text = `${labels[i]} (${digit(chartDatas[i])})`;
			result.push(text);
		}
		return result;
	}, [data]);

	return (
		<CustomChart
			dataLabels={adjustLabels}
			chartDoughnutData={data}
			chartName={chartName}
			chartType={chartType}
			labelPositon="left"
		/>
	);
};

PoliceDougnut.displayName = 'PoliceDougnut';

import { DoughnutData } from '@/components/ui/charts/doughnut/Doughnut';
import { ChartType } from 'chart.js';

type Props = {
	className?: string;
	data: DoughnutData;
	chartName?: string;
	labels?: string[];
	title: string;
	colors?: string[];
	chartType?: ChartType;
};

export const CrimeChart: React.FC<Props> = ({
	data,
	title,
	chartName,
	chartType,
	className,
	colors,
	labels,
}) => {
	return <div></div>;
};

CrimeChart.displayName = 'CrimeChart';

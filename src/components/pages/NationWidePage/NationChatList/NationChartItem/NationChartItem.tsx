import styles from '../NationChartList.module.scss';
import { ChartBox } from '@/components/ui/chart/chartBox';
import { SingleChartType } from '@/components/ui/chart/CustomChart';

type Props = {
	nowYear: string;
	chartDatas: Record<string, number>;
	colors?: string[];
};

export const NationChartItem: React.FC<Props> = ({
	nowYear,
	chartDatas,
	colors,
}) => {
	const datas: SingleChartType = {
		className: styles.gap,
		data: chartDatas,
		chartLabels: Object.keys(chartDatas),
		chartType: 'doughnut',
		labelPositon: 'bottom',
		colors: colors,
	};

	return (
		<ChartBox
			title={`${nowYear}년도 범죄별 통계  ${`[${Object.keys(chartDatas).toString()}]`}`}
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
			chartData={datas}
		/>
	);
};

NationChartItem.displayName = 'NationChartItem';

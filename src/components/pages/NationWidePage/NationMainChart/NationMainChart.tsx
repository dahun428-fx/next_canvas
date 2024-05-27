import { SingleChartType } from '@/components/ui/chart/CustomChart';
import { ChartBox } from '@/components/ui/chart/chartBox';
import { PoliceYearType, police_city } from '@/utils/openapi/police/data';
import { useMemo } from 'react';

type Props = {
	nowYear: string;
	policeYearlyData: PoliceYearType[];
};

/**
 * NationMainChart Component
 * @param param0
 * @returns
 */
export const NationMainChart: React.FC<Props> = ({
	nowYear,
	policeYearlyData,
}) => {
	const cityLabels = [...police_city];

	/**
	 * {[key : string] : number}
	 */
	const chartDatas: Record<string, number> = useMemo(() => {
		const data = policeYearlyData.filter(item => item.year === nowYear);
		const map = new Map<string, number>();
		data.forEach(item => {
			item.data.forEach(childItems => {
				map.set(childItems.city, childItems.totalCount ?? 0);
			});
		});
		return Object.fromEntries(map);
	}, [policeYearlyData, nowYear]);

	const datas: SingleChartType = {
		chartLabels: cityLabels,
		chartType: 'bar',
		data: chartDatas,
		percentOff: true,
		digitOff: true,
	};

	return (
		<ChartBox
			title={`${nowYear}년도 전국 지역별 범죄상황`}
			cardStyle={{
				margin: 2,
				overflow: 'auto',
				textAlign: 'center',
			}}
			titleStyle={{
				marginTop: 1,
			}}
			boxStyle={{
				minWidth: 700,
				overflow: 'auto',
			}}
			chartData={datas}
		/>
	);
};
NationMainChart.displayName = 'NationMainChart';

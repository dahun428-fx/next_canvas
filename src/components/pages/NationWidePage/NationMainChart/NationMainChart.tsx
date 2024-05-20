import { CustomChart } from '@/components/common/utils/CustomChart';
import { PoliceYearType, police_city } from '@/utils/openapi/police/data';
import { Box, Card, Typography } from '@mui/material';
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
	const chartDatas: { [key: string]: number } = useMemo(() => {
		const data = policeYearlyData.filter(item => item.year === nowYear);
		const map = new Map<string, number>();
		data.forEach(item => {
			item.data.forEach(childItems => {
				map.set(childItems.city, childItems.totalCount ?? 0);
			});
		});
		return Object.fromEntries(map);
	}, [policeYearlyData, nowYear]);

	return (
		<Card
			variant="outlined"
			sx={{
				overflow: 'auto',
				margin: 2,
				textAlign: 'center',
			}}
		>
			<Typography variant="overline" mt={1}>
				{nowYear}년도 전국 지역별 범죄상황
			</Typography>
			<Box
				sx={{
					minWidth: 700,
					overflow: 'auto',
				}}
			>
				<CustomChart
					dataLabels={cityLabels}
					chartLineData={chartDatas}
					chartType="bar"
					// isResponseSive={false}
				/>
			</Box>
		</Card>
	);
};
NationMainChart.displayName = 'NationMainChart';

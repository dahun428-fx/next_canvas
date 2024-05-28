import { RegionResourceYear } from '@/api/clients/services/open/region';
import { MultiChartDataType } from '@/components/ui/chart/CustomChart';
import { ChartBox } from '@/components/ui/chart/chartBox';
import { Card, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {
	selectedCityName: string;
	datasForMurderAndRobber: MultiChartDataType[];
	datasForViolenceAndStolen: MultiChartDataType[];
};

export const AreaFixMainChart: React.FC<Props> = ({
	datasForMurderAndRobber,
	datasForViolenceAndStolen,
	selectedCityName,
}) => {
	const dataYears = [...RegionResourceYear];

	return (
		<Card
			variant="outlined"
			sx={{
				overflow: 'auto',
				margin: 2,
				textAlign: 'center',
			}}
		>
			<Typography mt={2}>
				{`${selectedCityName} 지역 연도별 범죄 추이`}
			</Typography>
			<Stack direction={'row'} mt={2}>
				<ChartBox
					boxStyle={{
						minWidth: 700,
						margin: 1,
						overflow: 'auto',
					}}
					chartData={{
						chartLabels: dataYears,
						chartType: 'line',
						data: datasForMurderAndRobber,
						colors: ['#87CEEB', '#E6A4B4'],
						labelPositon: 'bottom',
					}}
				/>
				<Divider variant="middle" flexItem />
				<ChartBox
					boxStyle={{
						minWidth: 700,
						margin: 1,
						overflow: 'auto',
					}}
					chartData={{
						chartLabels: dataYears,
						chartType: 'line',
						data: datasForViolenceAndStolen,
						colors: ['#A0D8EF', '#F498AD'],
						labelPositon: 'bottom',
					}}
				/>
			</Stack>
		</Card>
	);
};

AreaFixMainChart.displayName = 'AreaFixMainChart';

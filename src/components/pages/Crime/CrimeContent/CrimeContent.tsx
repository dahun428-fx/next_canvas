import { Doughnut } from '@/components/ui/charts/doughnut';
import { digit } from '@/utils/number';
import {
	CrimeMainCategory,
	RegionItem,
	changeToChartData,
	makeDoughnutLabels,
} from '@/utils/openapi/region/region';
import { Box, Typography } from '@mui/material';
import { Context } from 'chartjs-plugin-datalabels';
import { useEffect, useMemo, useState } from 'react';
import { CrimeContentSub } from './CrimeContentSub';
import Divider from '@mui/material/Divider';
import { useSelector } from '@/store/hooks';
import { selectChartType } from '@/store/modules/common/region';
import { CustomChart } from '@/components/common/utils/CustomChart';

type Props = {
	data: RegionItem;
};

export const CrimeContent: React.FC<Props> = ({ data }) => {
	const chartType = useSelector(selectChartType);

	const adjustData = useMemo(() => {
		return changeToChartData(data.category);
	}, [data]);

	const title = useMemo(() => {
		return `${data.year} 년도 ${data.city_name}지역 범죄 대분류 차트`;
	}, [data]);

	if (!adjustData) {
		return null;
	}

	console.log('adjustData====>', adjustData);

	return (
		<Box mt={2}>
			<Typography sx={{ textAlign: 'center' }} variant="h5">
				{title}
			</Typography>
			<Box>
				<CustomChart
					dataLabels={makeDoughnutLabels(adjustData, data.totalCount)}
					chartDoughnutData={adjustData}
					chartType={chartType}
					labelPositon="left"
				/>
			</Box>
			<Divider />
			<Box mt={3}>
				<CrimeContentSub data={data} chartType={chartType} />
			</Box>
		</Box>
	);
};

CrimeContent.displayName = 'CrimeContent';

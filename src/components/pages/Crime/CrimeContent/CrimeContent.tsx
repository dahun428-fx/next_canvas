import { RegionItem, changeToChartData } from '@/utils/openapi/region/region';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { CrimeContentSub } from './CrimeContentSub';
import Divider from '@mui/material/Divider';
import { useSelector } from '@/store/hooks';
import { selectChartType } from '@/store/modules/common/region';
import { ChartBox } from '@/components/ui/chart/chartBox';
import { SingleChartType } from '@/components/ui/chart/CustomChart';

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

	const datas: SingleChartType = {
		chartLabels: Object.keys(adjustData),
		chartType: 'doughnut',
		labelPositon: 'left',
		data: adjustData,
	};
	if (!adjustData) {
		return null;
	}

	return (
		<Box mt={2}>
			<Typography sx={{ textAlign: 'center' }} variant="h5">
				{title}
			</Typography>
			<Box>
				<ChartBox chartData={datas} />
			</Box>
			<Divider />
			<Box mt={3}>
				<CrimeContentSub data={data} chartType={chartType} />
			</Box>
		</Box>
	);
};

CrimeContent.displayName = 'CrimeContent';

import { Box, Card, CardHeader, Grid } from '@mui/material';
import { SingleChartType } from '@/components/ui/chart/CustomChart';
import { ChartBox } from '@/components/ui/chart/chartBox';
import { PoliceCityType, PoliceDataType } from '@/utils/openapi/police/data';
import { digit } from '@/utils/number';

type Props = {
	data: PoliceCityType | PoliceDataType;
	title: string;
};

export const PoliceItem: React.FC<Props> = ({ data, title }) => {
	const { 강도, 살인, 절도, 폭력 } = data;
	const dataObj: Record<string, number> = {
		강도,
		살인,
		절도,
		폭력,
	};
	const subheader = `총 발생건수 : ${digit(강도 + 살인 + 절도 + 폭력)} 건`;

	const datas: SingleChartType = {
		chartLabels: Object.keys(dataObj),
		chartType: 'doughnut',
		data: dataObj,
		labelPositon: 'top',
		percentOff: true,
	};
	if (강도 + 살인 + 절도 + 폭력 > 0) {
		return null;
	}

	return (
		<Grid xs={12} sm={6} md={3} item>
			<Card>
				<CardHeader title={title} subheader={subheader} />
				<Box sx={{ p: 3, pb: 1 }}>
					<ChartBox
						boxStyle={{
							minWidth: '150px',
							maxWidth: '300px',
						}}
						chartData={datas}
						cardLine="elevation"
					/>
				</Box>
			</Card>
		</Grid>
	);
};

PoliceItem.displayName = 'PoliceItem';

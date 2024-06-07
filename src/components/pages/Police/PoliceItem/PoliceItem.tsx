import { Box, Card, CardHeader, Grid } from '@mui/material';
import { SingleChartType } from '@/components/ui/chart/CustomChart';
import { ChartBox } from '@/components/ui/chart/chartBox';

type Props = {
	title: string;
	subheader: string;
	dataObj: Record<string, number>;
};

export const PoliceItem: React.FC<Props> = ({ title, subheader, dataObj }) => {
	const datas: SingleChartType = {
		chartLabels: Object.keys(dataObj),
		chartType: 'doughnut',
		data: dataObj,
		labelPositon: 'top',
		percentOff: true,
	};

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

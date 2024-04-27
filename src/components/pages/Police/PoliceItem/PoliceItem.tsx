import { Doughnut } from '@/components/ui/charts/doughnut';
import { DoughnutData } from '@/components/ui/charts/doughnut/Doughnut';
import { Box, Card, CardHeader, Grid } from '@mui/material';
import { PoliceDougnut } from '../PoliceDougnut';

type Props = {
	title: string;
	subheader: string;
	dataObj: DoughnutData;
};

export const PoliceItem: React.FC<Props> = ({ title, subheader, dataObj }) => {
	return (
		<Grid xs={12} sm={6} md={3} item>
			<Card>
				<CardHeader title={title} subheader={subheader} />
				<Box sx={{ p: 3, pb: 1 }}>
					<PoliceDougnut data={dataObj} title={title} />
				</Box>
			</Card>
		</Grid>
	);
};

PoliceItem.displayName = 'PoliceItem';

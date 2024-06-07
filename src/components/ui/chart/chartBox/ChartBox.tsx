import { ReactNode } from 'react';
import { CustomChart, MultiChartType, SingleChartType } from '../CustomChart';
import { Box, Card, SxProps, Theme, Typography } from '@mui/material';

type Props = {
	chartData: SingleChartType | MultiChartType;
	title?: string | ReactNode;
	boxStyle?: SxProps<Theme> | undefined;
	cardStyle?: SxProps<Theme> | undefined;
	titleStyle?: SxProps<Theme> | undefined;
	cardLine?: 'outlined' | 'elevation';
};

export const ChartBox: React.FC<Props> = ({
	cardStyle,
	boxStyle,
	titleStyle,
	chartData,
	title,
	cardLine = 'outlined',
}) => {
	return (
		<Card
			variant={cardLine}
			sx={{ margin: 2, textAlign: 'center', overflow: 'auto', ...cardStyle }}
		>
			<Typography
				variant="overline"
				sx={{
					...titleStyle,
				}}
			>
				{title}
			</Typography>
			<Box
				sx={{
					...boxStyle,
				}}
			>
				<CustomChart {...chartData} />
			</Box>
		</Card>
	);
};

ChartBox.displayName = 'ChartBox';

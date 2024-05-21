import { CustomChart } from '@/components/common/utils/CustomChart';
import { Box, Card, Typography } from '@mui/material';
import styles from '../NationChartList.module.scss';

type Props = {
	nowYear: string;
	chartDatas: { [k: string]: number };
	colors?: string[];
};

export const NationChartItem: React.FC<Props> = ({
	nowYear,
	chartDatas,
	colors,
}) => {
	return (
		<Card variant="outlined" sx={{ margin: 2, textAlign: 'center' }}>
			<Typography variant="overline" sx={{ margin: 2, textAlign: 'center' }}>
				{nowYear}년도 범죄별 통계
				{`  [${Object.keys(chartDatas).toString()}]`}
			</Typography>
			<Box
				sx={{
					height: '350px',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<CustomChart
					className={styles.gap}
					dataLabels={Object.keys(chartDatas)}
					chartDoughnutData={chartDatas}
					chartType="doughnut"
					labelPositon="bottom"
					colors={colors}
					// isResponseSive={false}
					needDigit
					needPercent
				/>
			</Box>
		</Card>
	);
};

NationChartItem.displayName = 'NationChartItem';

import { ViolentChartsModalButton } from '../ViolentChartsModalButton';
import styles from './ViolentCharts.module.scss';
import { Box } from '@mui/material';
import { MultiChartDataType } from '@/components/ui/chart/CustomChart';
import { ChartBox } from '@/components/ui/chart/chartBox';

type Props = {
	dataObject: MultiChartDataType[];
	title: string;
	labels: string[];
};

export const ViolentCharts: React.FC<Props> = ({
	dataObject,
	labels,
	title,
}) => {
	return (
		<Box>
			<div className={styles.modalButton}>
				<ViolentChartsModalButton
					dataObject={dataObject}
					labels={labels}
					title={title}
				/>
			</div>
			<ChartBox
				chartData={{
					chartLabels: labels,
					chartType: 'line',
					data: dataObject,
					labelPositon: 'top',
				}}
			/>
		</Box>
	);
};

ViolentCharts.displayName = 'ViolentCharts';

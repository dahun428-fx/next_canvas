import { VerticalBar } from '@/components/ui/charts/verticalbar';
import { ViolentData } from '../ViolentMain';
import { ViolentChartsModalButton } from '../ViolentChartsModalButton';
import styles from './ViolentCharts.module.scss';
import { useSelector } from '@/store/hooks';
import { selectChartType } from '@/store/modules/common/violence';
import { Box } from '@mui/material';

type Props = {
	dataObject: ViolentData[];
	title: string;
	labels: string[];
};

export const ViolentCharts: React.FC<Props> = ({
	dataObject,
	labels,
	title,
}) => {
	const chartType = useSelector(selectChartType);

	return (
		<Box>
			<div className={styles.modalButton}>
				<ViolentChartsModalButton
					dataObject={dataObject}
					labels={labels}
					title={title}
				/>
			</div>
			<VerticalBar
				dataObject={dataObject}
				labels={labels}
				chartName={title}
				zoomNeed={false}
				chartType={chartType}
			/>
		</Box>
	);
};

ViolentCharts.displayName = 'ViolentCharts';

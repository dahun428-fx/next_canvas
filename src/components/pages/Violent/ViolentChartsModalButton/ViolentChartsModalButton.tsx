import { Modal, ModalOpener, ModalProvider } from '@/components/ui/modal';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import { IconButton, Tooltip } from '@mui/material';
import { VerticalBar } from '@/components/ui/charts/verticalbar';
import { ModalSizeType } from '@/components/ui/modal/Modal';
import { useSelector } from '@/store/hooks';
import { selectChartType } from '@/store/modules/common/violence';
import { MultiChartDataType } from '@/components/ui/chart/CustomChart';

type Props = {
	disabled?: boolean;
	dataObject: MultiChartDataType[];
	title: string;
	labels: string[];
};
export const ViolentChartsModalButton: React.FC<Props> = ({
	disabled,
	...props
}) => {
	const chartType = useSelector(selectChartType);

	return (
		<ModalProvider>
			<ModalOpener>
				<Tooltip title="확대">
					<IconButton>
						<FilterNoneIcon />
					</IconButton>
				</Tooltip>
			</ModalOpener>
			<Modal
				title={props.title}
				// className={styles.container}
				size={ModalSizeType.lg}
			>
				<div>
					<VerticalBar
						dataObject={props.dataObject}
						labels={props.labels}
						chartName={props.title}
						chartType={chartType}
					/>
				</div>
			</Modal>
		</ModalProvider>
	);
};

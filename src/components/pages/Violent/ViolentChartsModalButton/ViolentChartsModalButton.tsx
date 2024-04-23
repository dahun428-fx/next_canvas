import { Modal, ModalOpener, ModalProvider } from '@/components/ui/modal';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import { Button, IconButton, Tooltip } from '@mui/material';
import { ViolentData } from '../ViolentMain';
import { VerticalBar } from '@/components/ui/charts/verticalbar';
import styles from './ViolentChartsModalButton.module.scss';
import { ModalSizeType } from '@/components/ui/modal/Modal';
import { useSelector } from '@/store/hooks';
import { selectChartType } from '@/store/modules/common/violence';

type Props = {
	disabled?: boolean;
	dataObject: ViolentData[];
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

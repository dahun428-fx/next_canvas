import { ViolenceState } from '@/store/modules/common/violence';
import { Grid } from '@mui/material';
import { ViolentTable } from '../ViolentTable';
import { SwitchBasic } from '@/components/ui/list/switch';
import styles from '../ViolentMain.module.scss';
import { ViolentCharts } from '../ViolentCharts';
import { MultiChartDataType } from '@/components/ui/chart/CustomChart';

type Props = {
	violenceResponse: ViolenceState;
	cityNames: string[];
	title: string;
	labels: string[];
	datas: MultiChartDataType[];
	checkedCityName?: string[];
	changeCheckedCityNames: (items: string[]) => void;
};

export const ViolentParts: React.FC<Props> = ({
	cityNames,
	checkedCityName,
	violenceResponse,
	title,
	labels,
	datas,
	changeCheckedCityNames,
}) => {
	if (violenceResponse.items.length < 1) return null;

	return (
		<Grid
			container
			spacing={2}
			sx={{
				overflow: 'auto',
			}}
		>
			<Grid item sm={10} md={10}>
				<ViolentCharts dataObject={datas} labels={labels} title={title} />
				<ViolentTable dataObject={datas} labels={labels} tableTitle={title} />
			</Grid>
			<Grid item sm={2} md={2}>
				<SwitchBasic
					className={styles.violentSwitch}
					data={cityNames}
					checkedCityName={checkedCityName}
					parentCheckEvent={changeCheckedCityNames}
				/>
			</Grid>
		</Grid>
	);
};

ViolentParts.displayName = 'ViolentParts';

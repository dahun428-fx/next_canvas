import { ChartType } from 'chart.js';
import { BottomNavi as Presenter } from './BottomNavi';
import { useCallback, useMemo } from 'react';
import { useSelector } from '@/store/hooks';
import {
	selectBottomChartTypes,
	selectBottomPageRoute,
} from '@/store/modules/common/bottom';
import {
	updateChartTypeOperation as ViolenceOperation,
	selectChartType as violenceSelectChart,
} from '@/store/modules/common/violence';
import {
	updateChartTypeOperation as PoliceOperation,
	selectPoliceChartType,
} from '@/store/modules/common/police';
import { useDispatch } from 'react-redux';
import {
	selectChartType as selectRegionChartType,
	updateChartTypeOperation as RegionOperation,
} from '@/store/modules/common/region';

type Props = {};

export const BottomNavi: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const chartTypes = useSelector(selectBottomChartTypes);
	const pageRoute = useSelector(selectBottomPageRoute);
	const policeChartType = useSelector(selectPoliceChartType);
	const violenceChartType = useSelector(violenceSelectChart);
	const regionChartType = useSelector(selectRegionChartType);

	const selected = useMemo(() => {
		switch (pageRoute) {
			case 'violent':
				return violenceChartType;
			case 'police':
				return policeChartType;
			case 'region':
				return regionChartType;
			default:
				break;
		}
	}, [
		pageRoute,
		dispatch,
		chartTypes,
		violenceChartType,
		policeChartType,
		regionChartType,
	]);

	const handleChangeChartType = useCallback(
		(value: ChartType) => {
			switch (pageRoute) {
				case 'police':
					PoliceOperation(dispatch)(value);
					break;
				case 'violent':
					ViolenceOperation(dispatch)(value);
					break;
				case 'region':
					RegionOperation(dispatch)(value);
				default:
					break;
			}
		},
		[
			selected,
			pageRoute,
			dispatch,
			chartTypes,
			violenceChartType,
			policeChartType,
		]
	);

	if (!chartTypes || chartTypes.length < 1 || !pageRoute) {
		return null;
	}
	return (
		<Presenter
			availableCharts={chartTypes}
			handleChangeChartType={handleChangeChartType}
			selectedChartType={selected}
		/>
	);
};

BottomNavi.displayName = 'BottomNavi';

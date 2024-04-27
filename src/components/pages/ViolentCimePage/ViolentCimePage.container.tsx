import { useEffect, useRef } from 'react';
import { ViolentCimePage as Presenter } from './ViolentCimePage';
import { loadOperation, selectPolice } from '@/store/modules/common/police';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
	bottomBarAddChartTypesOpertion,
	bottomBarUpdatePageRouteOperation,
} from '@/store/modules/common/bottom';
import { ChartType } from 'chart.js';

type Props = {};

export const ViolentCimePage: React.FC<Props> = () => {
	const initailized = useRef(false);
	const initailized2 = useRef(false);
	const policeResponse = useSelector(selectPolice);
	const dispatch = useDispatch();

	const availableCharts: ChartType[] = ['doughnut', 'polarArea', 'pie'];

	useEffect(() => {
		if (!initailized.current && policeResponse.items.length < 1) {
			loadOperation(dispatch)();
			initailized.current = true;
		}
	}, [dispatch, initailized.current, policeResponse.items.length]);

	useEffect(() => {
		if (!initailized2.current) {
			bottomBarAddChartTypesOpertion(dispatch)(availableCharts);
			bottomBarUpdatePageRouteOperation(dispatch)('police');
			initailized2.current = true;
		}
	}, [dispatch, initailized2]);

	return <Presenter />;
};
ViolentCimePage.displayName = 'ViolentCimePage';

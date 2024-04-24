import { useEffect, useRef } from 'react';
import { CrimeRegionPage as Presenter } from './CrimeRegionPage';
import { useSelector } from '@/store/hooks';
import { loadOperations, selectRegion } from '@/store/modules/common/region';
import { useDispatch } from 'react-redux';
import { ChartType } from 'chart.js';
import {
	bottomBarAddChartTypesOpertion,
	bottomBarUpdatePageRouteOperation,
} from '@/store/modules/common/bottom';

type Props = {};
export const CrimeRegionPage: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const regionResponse = useSelector(selectRegion);

	const initialize = useRef(false);
	const initailized2 = useRef(false);
	const availableCharts: ChartType[] = ['doughnut', 'polarArea', 'pie'];
	// useEffect(() => {
	// 	if (!initialize.current && regionResponse.items.length < 1) {
	// 		loadOperations(dispatch)();
	// 		initialize.current = true;
	// 	}
	// }, [dispatch, regionResponse.items.length, initialize.current]);
	useEffect(() => {
		if (!initailized2.current) {
			bottomBarAddChartTypesOpertion(dispatch)(availableCharts);
			bottomBarUpdatePageRouteOperation(dispatch)('region');
			initailized2.current = true;
		}
	}, [dispatch, initailized2]);

	return <Presenter />;
};
CrimeRegionPage.displayName = 'CrimeRegionPage';

import React, { useEffect, useRef, useState } from 'react';
import { ViolentYearlyPage as Presenter } from './ViolentYearlyPage';
import { useSelector } from '@/store/hooks';
import {
	ViolenceItem,
	loadOperations,
	selectViolence,
} from '@/store/modules/common/violence';
import { mergeByYearly } from '@/utils/openapi/police/police';
import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import { useDispatch } from 'react-redux';
import { ChartType } from 'chart.js';
import {
	bottomBarAddChartTypesOpertion,
	bottomBarUpdatePageRouteOperation,
} from '@/store/modules/common/bottom';

type Props = {};

export const ViolentYearlyPage: React.FC<Props> = () => {
	const initailized = useRef(false);
	const initailized2 = useRef(false);
	const violenceResponse = useSelector(selectViolence);
	const availableCharts: ChartType[] = ['line', 'bar'];

	const dispatch = useDispatch();

	useEffect(() => {
		if (!initailized2.current) {
			bottomBarAddChartTypesOpertion(dispatch)(availableCharts);
			bottomBarUpdatePageRouteOperation(dispatch)('violent');
			initailized2.current = true;
		}
	}, [dispatch, initailized2]);

	useEffect(() => {
		if (!initailized.current && violenceResponse.items.length < 1) {
			loadOperations(dispatch)('2022');
			initailized.current = true;
		}
	}, [dispatch, initailized.current, violenceResponse.items.length]);

	return <Presenter />;
};

ViolentYearlyPage.displayName = 'ViolentYearly';

import React, { useEffect, useRef, useState } from 'react';
import { ViolentYearlyPage as Presenter } from './ViolentYearlyPage';
import { useSelector } from '@/store/hooks';
import {
	ViolenceItem,
	loadOperations,
	selectViolence,
	setOperations,
} from '@/store/modules/common/violence';
import { mergeByYearly } from '@/utils/openapi/police/police';
import {
	Police,
	SearchPoliceReseponse,
} from '@/models/api/open/police/SearchPoliceResponse';
import { useDispatch } from 'react-redux';
import { ChartType } from 'chart.js';
import {
	bottomBarAddChartTypesOpertion,
	bottomBarUpdatePageRouteOperation,
} from '@/store/modules/common/bottom';

type Props = {
	initialYear: string;
	violenceItems: SearchPoliceReseponse[];
};

export const ViolentYearlyPage: React.FC<Props> = ({
	initialYear,
	violenceItems,
}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		setOperations(dispatch)(violenceItems);
	}, [dispatch, violenceItems]);

	return <Presenter />;
};

ViolentYearlyPage.displayName = 'ViolentYearly';

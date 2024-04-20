import { Container } from '@mui/material';
import { PoliceMain } from '../Police';
import { BottomNavi } from '@/components/common/BottomNavi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	loadOperation,
	selectPolice,
	updateChartTypeOperation,
} from '@/store/modules/common/police';
import { loadOperations } from '@/store/modules/common/violence';
import { useSelector } from '@/store/hooks';
import { ChartType } from 'chart.js';
import { bottomBarAddChartTypesOpertion } from '@/store/modules/common/bottom';

type Props = {};

export const ViolentCimePage: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const availableCharts: ChartType[] = ['doughnut', 'polarArea', 'pie'];
	const [selectedChartType, setSelectedChartType] =
		useState<ChartType>('doughnut');

	const handleChangeChartType = useCallback(
		(value: ChartType) => {
			setSelectedChartType(value);
			updateChartTypeOperation(dispatch)(value);
		},
		[selectedChartType, setSelectedChartType]
	);

	return (
		<Container maxWidth="xl">
			<PoliceMain />
			{/* <BottomNavi
			// availableCharts={availableCharts}
			// handleChangeChartType={handleChangeChartType}
			// selectedChartType={selectedChartType}
			/> */}
		</Container>
	);
};

ViolentCimePage.displayName = 'ViolentCimePage';

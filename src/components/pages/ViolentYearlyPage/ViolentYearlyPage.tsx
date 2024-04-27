import { Container } from '@mui/material';
import { ViolentMain } from '../Violent/ViolentMain.container';
import { ChartType } from 'chart.js';
import { useCallback, useState } from 'react';
import { updateChartTypeOperation } from '@/store/modules/common/violence';
import { useDispatch } from 'react-redux';

type Props = {};

export const ViolentYearlyPage: React.FC<Props> = ({}) => {
	const dispatch = useDispatch();

	const availableCharts: ChartType[] = ['line', 'bar'];
	const [selectedChartType, setSelectedChartType] = useState<ChartType>('line');

	const handleChangeChartType = useCallback(
		(value: ChartType) => {
			setSelectedChartType(value);
			updateChartTypeOperation(dispatch)(value);
		},
		[selectedChartType, setSelectedChartType]
	);

	return (
		<Container>
			<ViolentMain />
		</Container>
	);
};

ViolentYearlyPage.displayName = 'ViolentYearly';

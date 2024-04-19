import { BottomNavi } from '@/components/common/BottomNavi';
import { Container } from '@mui/material';
import { ViolentMain } from '../Violent/ViolentMain.container';
import { ChartTypeRegistry, ChartType } from 'chart.js';
import { useCallback, useState } from 'react';
import { updateChartTypeOperation } from '@/store/modules/common/violence';
import { useDispatch } from 'react-redux';

// export type ViolentAcceptableChart = Pick<ChartTypeRegistry, "line" | "bar" | "polarArea">;

// const availableChart:ChartType[] = ["line", "bar", "polarArea"] as const;

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
		<Container maxWidth="xl">
			<ViolentMain selectedChart={selectedChartType} />
			<BottomNavi
				handleChangeChartType={handleChangeChartType}
				selectedChartType={selectedChartType}
				availableCharts={availableCharts}
			/>
		</Container>
	);
};

ViolentYearlyPage.displayName = 'ViolentYearly';

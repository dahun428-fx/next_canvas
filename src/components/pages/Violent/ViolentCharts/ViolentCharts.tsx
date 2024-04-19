import { VerticalBar } from '@/components/ui/charts/verticalbar';
import { ViolentData } from '../ViolentMain';
import { ViolentChartsModalButton } from '../ViolentChartsModalButton';
import styles from './ViolentCharts.module.scss';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { ChartType } from 'chart.js';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/hooks';
import { selectChartType } from '@/store/modules/common/violence';

type Props = {
	dataObject: ViolentData[];
	title: string;
	labels: string[];
	selectedChart?: ChartType;
};

export const ViolentCharts: React.FC<Props> = ({
	dataObject,
	labels,
	title,
	selectedChart = 'line',
}) => {
	const dispatch = useDispatch();
	const chartType = useSelector(selectChartType);

	return (
		<>
			<div className={styles.modalButton}>
				<ViolentChartsModalButton
					dataObject={dataObject}
					labels={labels}
					title={title}
				/>
			</div>
			<VerticalBar
				dataObject={dataObject}
				labels={labels}
				chartName={title}
				zoomNeed={false}
				chartType={chartType}
			/>
		</>
	);
};

ViolentCharts.displayName = 'ViolentCharts';

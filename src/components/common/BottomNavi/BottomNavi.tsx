import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Card,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { useState } from 'react';
import styles from './BottomNavi.module.scss';
import { ChartType } from 'chart.js';
import BarChartIcon from '@mui/icons-material/BarChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PieChartIcon from '@mui/icons-material/PieChart';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import RadarIcon from '@mui/icons-material/Radar';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

type Props = {
	availableCharts?: ChartType[];
	handleChangeChartType?: (value: ChartType) => void;
	selectedChartType?: ChartType;
};

export const BottomNavi: React.FC<Props> = ({
	availableCharts,
	selectedChartType,
	handleChangeChartType,
}) => {
	if (
		!availableCharts ||
		availableCharts.length < 1 ||
		!handleChangeChartType ||
		!selectedChartType
	) {
		return null;
	}

	const ChartIcons = (chartType: ChartType) => {
		switch (chartType) {
			case 'bar':
				return <BarChartIcon />;
			case 'bubble':
				return <BubbleChartIcon />;
			case 'doughnut':
				return <DonutLargeIcon />;
			case 'line':
				return <SsidChartIcon />;
			case 'pie':
				return <PieChartIcon />;
			case 'polarArea':
				return <DonutSmallIcon />;
			case 'radar':
				return <RadarIcon />;
			case 'scatter':
				return <ScatterPlotIcon />;
		}
	};

	return (
		<Card className={styles.bottomfixed}>
			<BottomNavigation
				showLabels
				value={selectedChartType}
				onChange={(event, newValue) => {
					handleChangeChartType(newValue);
				}}
			>
				{availableCharts.map((item, index) => {
					const key = `${item}_${index}`;
					return (
						<BottomNavigationAction
							key={key}
							label={item}
							value={item}
							icon={ChartIcons(item)}
						/>
					);
				})}
			</BottomNavigation>
		</Card>
	);
};

BottomNavi.displayName = 'BottomNavi';

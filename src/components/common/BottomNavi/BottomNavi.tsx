import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Card,
	CardContent,
	CardHeader,
	Typography,
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
import AssessmentIcon from '@mui/icons-material/AssessmentOutlined';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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
		<>
			<div></div>
			<Box sx={{ marginRight: '12px' }}>
				<AssessmentIcon fontSize="large" />
			</Box>
			<Card className={styles.bottomfixed}>
				{/* <CardContent
				sx={{ backgroundColor: '#1976d2', textAlign: 'center', padding: '5px' }}
			>
				<Typography sx={{ fontWeight: 'bold', color: '#fff' }}>
					차트변경
				</Typography>
			</CardContent> */}
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
		</>
	);
};

BottomNavi.displayName = 'BottomNavi';

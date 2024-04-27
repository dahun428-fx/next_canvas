import { Doughnut } from '@/components/ui/charts/doughnut';
import {
	CrimeMainCategory,
	RegionCategoryItem,
	RegionItem,
	changeToChartDataSub,
	makeDoughnutLabels,
} from '@/utils/openapi/region/region';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { CrimeContentSubTabList } from './CrimeContentSubTabList';
import { ChartType } from 'chart.js';

type Props = {
	data: RegionItem;
	chartType: ChartType;
};
export const CrimeContentSub: React.FC<Props> = ({ data, chartType }) => {
	return (
		<Box sx={{ width: '100%' }}>
			<CrimeContentSubTabList data={data} chartType={chartType} />
		</Box>
	);
};
CrimeContentSub.displayName = 'CrimeContentSub';

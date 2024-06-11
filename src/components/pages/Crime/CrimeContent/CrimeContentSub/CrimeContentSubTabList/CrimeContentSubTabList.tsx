import { ChartBox } from '@/components/ui/chart/chartBox';
import {
	CrimeMainCategory,
	RegionItem,
	changeToChartDataSub,
} from '@/utils/openapi/region/region';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import { ChartType } from 'chart.js';
import React, { useCallback, useMemo, useState } from 'react';

type Props = {
	data: RegionItem;
	chartType: ChartType;
};

export const CrimeContentSubTabList: React.FC<Props> = ({
	data,
	chartType,
}) => {
	const [value, setValue] = useState<CrimeMainCategory>('강력범죄');
	const handleChange = (
		event: React.SyntheticEvent,
		newValue: CrimeMainCategory
	) => {
		setValue(newValue);
	};
	const subCrime = useMemo(() => {
		return Object.keys(CrimeMainCategory);
	}, []);

	const getSubData = useCallback(
		(mainCategory: string) => {
			return changeToChartDataSub(data.category, mainCategory);
		},
		[data]
	);

	return (
		<TabContext value={value}>
			<Box>
				<TabList
					onChange={handleChange}
					textColor="secondary"
					indicatorColor="secondary"
				>
					{subCrime.map((item, index) => {
						return <Tab key={`${item}_${index}`} value={item} label={item} />;
					})}
				</TabList>
			</Box>
			{subCrime.map((item, index) => {
				const title = `${data.year} 년도 ${data.city_name} 지역 범죄 중분류 차트 - ${item}`;
				const adjustData = getSubData(item);

				return (
					<TabPanel value={item} key={`${item}_${index}`}>
						<Typography sx={{ textAlign: 'center' }} variant="h6">
							{title}
						</Typography>
						<Box>
							<ChartBox
								chartData={{
									chartLabels: Object.keys(adjustData),
									data: adjustData,
									chartType: 'doughnut',
									labelPositon: 'left',
								}}
							/>
						</Box>
					</TabPanel>
				);
			})}
		</TabContext>
	);
};

CrimeContentSubTabList.displayName = 'CrimeContentSubTabList';

import { policeCityArray } from '@/utils/openapi/police/police';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab } from '@mui/material';
import { SyntheticEvent, useMemo, useState } from 'react';
import { PoliceList } from './PoliceList';
import { PoliceItem } from './PoliceItem';
import { digit } from '@/utils/number';
import { DoughnutData } from '@/components/ui/charts/doughnut/Doughnut';
import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import {
	police_city_data,
	police_seperete_city,
} from '@/utils/openapi/police/data';

type Props = {
	policeDatas: Police[];
};

export const PoliceMain: React.FC<Props> = ({ policeDatas }) => {
	const [tabValue, setTabValue] = useState(`police_0`);

	const seperatedPoliceList = useMemo(() => {
		return police_seperete_city(policeDatas);
	}, [policeDatas]);

	const mergePoliceList = useMemo(() => {
		return police_city_data(policeDatas);
	}, [policeDatas]);

	//지역별 , 연도별,
	return (
		<>
			<TabContext value={tabValue}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList
						onChange={(event: SyntheticEvent, value: string) =>
							setTabValue(value)
						}
						variant="scrollable"
						// aria-label="lab API tabs example"
					>
						{seperatedPoliceList && seperatedPoliceList.length > 0 && (
							<Tab label={`전체`} value={`police_all`} />
						)}
						{policeCityArray &&
							policeCityArray.length > 0 &&
							policeCityArray.map((tabName, tabId) => {
								return (
									<Tab
										key={`police_${tabId}`}
										label={tabName}
										value={`police_${tabId}`}
									/>
								);
							})}
					</TabList>
				</Box>
				<TabPanel value={`police_all`}>
					<Grid container spacing={3}>
						{mergePoliceList &&
							mergePoliceList.length > 0 &&
							mergePoliceList.map((item, index) => {
								return (
									<PoliceItem
										title={item.city}
										data={item}
										key={`all_${index}`}
									/>
								);
							})}
					</Grid>
				</TabPanel>
				{seperatedPoliceList &&
					seperatedPoliceList.length > 0 &&
					seperatedPoliceList.map((items, pIndex) => {
						return (
							<TabPanel key={`police_${pIndex}`} value={`police_${pIndex}`}>
								<PoliceList items={items} />
							</TabPanel>
						);
					})}
			</TabContext>
		</>
	);
};

PoliceMain.displayName = 'PoliceMain';

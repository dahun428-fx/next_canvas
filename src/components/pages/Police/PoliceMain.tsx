import { SearchPoliceRequest } from '@/models/api/open/police/SearchPoliceRequest';
import { PoliceState } from '@/store/modules/common/police';
import {
	mergeByCity,
	policeCityArray,
	seperateByCity,
} from '@/utils/openapi/police/police';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Tab,
	Typography,
} from '@mui/material';
import { SyntheticEvent, useMemo, useState } from 'react';
import { PoliceList } from './PoliceList';
import { PoliceItem } from './PoliceItem';
import { digit } from '@/utils/number';
import { DoughnutData } from '@/components/ui/charts/doughnut/Doughnut';

type Props = {
	onReload: (request: Omit<SearchPoliceRequest, 'serviceKey'>) => void;
	searchPoliceRequest: Omit<SearchPoliceRequest, 'serviceKey'>;
	policeResponse: PoliceState;
	policeYears: string[];
};

export const PoliceMain: React.FC<Props> = ({
	onReload,
	searchPoliceRequest,
	policeResponse,
	policeYears,
}) => {
	const [tabValue, setTabValue] = useState(`police_${0}`);
	const [yearValue, setYearValue] = useState(policeYears[0] ?? '');

	const seperatedPoliceList = useMemo(() => {
		return seperateByCity(policeResponse.items);
	}, [policeResponse.items]);

	const mergePoliceList = useMemo(() => {
		return mergeByCity(policeResponse.items);
	}, [policeResponse.items]);

	const handleChange = (e: SelectChangeEvent) => {
		const { value } = e.target;
		setYearValue(value);
		onReload({ ...searchPoliceRequest, year: `${value}` });
	};

	//지역별 , 연도별,
	return (
		<>
			<Typography variant="h4" sx={{ mb: 5 }}>
				경찰청 전국 경찰서별 강력범죄 발생 현황
				{policeResponse.year && ` ( ${yearValue} )`}
			</Typography>
			<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
				<InputLabel id="demo-select-small-label">연도</InputLabel>
				<Select
					labelId="demo-select-small-label"
					id="demo-select-small"
					value={yearValue}
					label="연도"
					onChange={e => handleChange(e)}
				>
					{policeYears &&
						policeYears.length > 0 &&
						policeYears.map((item, index) => {
							return (
								<MenuItem key={`year_${item}`} value={`${item}`}>
									{item}
								</MenuItem>
							);
						})}
				</Select>
			</FormControl>
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
								const { 강도, 살인, city, 절도, 폭력 } = item;
								const dataObj: DoughnutData = {
									강도,
									절도,
									살인,
									폭력,
								};

								const subheader = `총 발생건수 : ${digit(강도 + 살인 + 절도 + 폭력)} 건`;
								if (강도 + 살인 + 절도 + 폭력 > 0) {
									return (
										<PoliceItem
											key={`all_${index}`}
											dataObj={dataObj}
											title={city}
											subheader={subheader}
										/>
									);
								}
								return null;
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

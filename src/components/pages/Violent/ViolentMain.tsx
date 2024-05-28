import { ViolenceState } from '@/store/modules/common/violence';
import {
	PoliceType,
	mergeByCityWithYear,
	mergeByYearly,
	policeCityArray,
} from '@/utils/openapi/police/police';
import { SyntheticEvent, useMemo, useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ViolentParts } from './ViolentParts/ViolentParts';
import { MultiChartDataType } from '@/components/ui/chart/CustomChart';

type Props = {
	violenceResponse: ViolenceState;
};

const cityNames = policeCityArray;

export const ViolentMain: React.FC<Props> = ({ violenceResponse }) => {
	const [tabValue, setTabValue] = useState<PoliceType>(PoliceType.ROBBER);

	const [checkedCityNamesWithRobber, setCheckedCityNamesWithRobber] =
		useState<string[]>(cityNames);
	const [checkedCityNamesWithMurder, setCheckedCityNamesWithMurder] =
		useState<string[]>(cityNames);
	const [checkedCityNamesWithTheft, setCheckedCityNamesWithTheft] =
		useState<string[]>(cityNames);
	const [checkedCityNamesWithViolence, setCheckedCityNamesWithViolence] =
		useState<string[]>(cityNames);
	const [checkedCityNamesWithTotal, setCheckedCityNamesWithTotal] =
		useState<string[]>(cityNames);

	const changeCheckedCityNamesWithRobber = (items: string[]) => {
		setCheckedCityNamesWithRobber(Array.from(new Set(items)));
	};
	const changeCheckedCityNamesWithMurder = (items: string[]) => {
		setCheckedCityNamesWithMurder(Array.from(new Set(items)));
	};
	const changeCheckedCityNamesWithTheft = (items: string[]) => {
		setCheckedCityNamesWithTheft(Array.from(new Set(items)));
	};
	const changeCheckedCityNamesWithViolence = (items: string[]) => {
		setCheckedCityNamesWithViolence(Array.from(new Set(items)));
	};
	const changeCheckedCityNamesWithTotal = (items: string[]) => {
		setCheckedCityNamesWithTotal(Array.from(new Set(items)));
	};

	const labels = useMemo(() => {
		const mergedData = mergeByYearly(violenceResponse.items);
		return mergedData.map((item, index) => {
			return Object.keys(item)[0];
		});
	}, [violenceResponse]);

	const datasTotal = useMemo(() => {
		let result: MultiChartDataType[] = [];
		mergeByCityWithYear(violenceResponse.items).forEach((item, index) => {
			if (checkedCityNamesWithTotal.includes(item.city)) {
				result.push({ label: item.city, data: item.total });
			}
		});

		return result;
	}, [violenceResponse, checkedCityNamesWithTotal]);

	const datasForRobber = useMemo(() => {
		let result: MultiChartDataType[] = [];
		mergeByCityWithYear(violenceResponse.items).forEach((item, index) => {
			if (checkedCityNamesWithRobber.includes(item.city)) {
				result.push({ label: item.city, data: item.강도 });
			}
		});

		return result;
	}, [violenceResponse, checkedCityNamesWithRobber]);
	const datasForMurder = useMemo(() => {
		let result: MultiChartDataType[] = [];
		mergeByCityWithYear(violenceResponse.items).forEach((item, index) => {
			if (checkedCityNamesWithMurder.includes(item.city)) {
				result.push({ label: item.city, data: item.살인 });
			}
		});

		return result;
	}, [violenceResponse, checkedCityNamesWithMurder]);
	const datasForTheft = useMemo(() => {
		let result: MultiChartDataType[] = [];
		mergeByCityWithYear(violenceResponse.items).forEach((item, index) => {
			if (checkedCityNamesWithTheft.includes(item.city)) {
				result.push({ label: item.city, data: item.절도 });
			}
		});

		return result;
	}, [violenceResponse, checkedCityNamesWithTheft]);
	const datasForViolence = useMemo(() => {
		let result: MultiChartDataType[] = [];
		mergeByCityWithYear(violenceResponse.items).forEach((item, index) => {
			if (checkedCityNamesWithViolence.includes(item.city)) {
				result.push({ label: item.city, data: item.폭력 });
			}
		});

		return result;
	}, [violenceResponse, checkedCityNamesWithViolence]);

	if (violenceResponse.items.length < 1) return null;

	return (
		<div>
			<TabContext value={tabValue}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList
						// variant="scrollable"
						onChange={(event: SyntheticEvent, value: PoliceType) => {
							setTabValue(value);
						}}
						variant="scrollable"
						// centered
						// aria-label="lab API tabs example"
					>
						<Tab label={`전체`} value={'all'} />
						<Tab label={`${PoliceType.ROBBER}`} value={PoliceType.ROBBER} />
						<Tab label={`${PoliceType.MURDER}`} value={PoliceType.MURDER} />
						<Tab label={`${PoliceType.THEFT}`} value={PoliceType.THEFT} />
						<Tab label={`${PoliceType.VIOLENCE}`} value={PoliceType.VIOLENCE} />
					</TabList>
				</Box>
				<TabPanel value={'all'}>
					<ViolentParts
						labels={labels}
						cityNames={cityNames}
						title={`연도별 / 지역별 강력범죄 추이 ( 전체 )`}
						datas={datasTotal}
						violenceResponse={violenceResponse}
						changeCheckedCityNames={changeCheckedCityNamesWithTotal}
						checkedCityName={checkedCityNamesWithTotal}
					/>
				</TabPanel>
				<TabPanel value={PoliceType.ROBBER}>
					<ViolentParts
						labels={labels}
						cityNames={cityNames}
						title={`연도별 / 지역별 강력범죄 추이 (${PoliceType.ROBBER})`}
						datas={datasForRobber}
						violenceResponse={violenceResponse}
						changeCheckedCityNames={changeCheckedCityNamesWithRobber}
						checkedCityName={checkedCityNamesWithRobber}
					/>
				</TabPanel>
				<TabPanel value={PoliceType.MURDER}>
					<ViolentParts
						labels={labels}
						cityNames={cityNames}
						title={`연도별 / 지역별 강력범죄 추이 (${PoliceType.MURDER})`}
						datas={datasForMurder}
						violenceResponse={violenceResponse}
						changeCheckedCityNames={changeCheckedCityNamesWithMurder}
						checkedCityName={checkedCityNamesWithMurder}
					/>
				</TabPanel>
				<TabPanel value={PoliceType.THEFT}>
					<ViolentParts
						labels={labels}
						cityNames={cityNames}
						title={`연도별 / 지역별 강력범죄 추이 (${PoliceType.THEFT})`}
						datas={datasForTheft}
						violenceResponse={violenceResponse}
						changeCheckedCityNames={changeCheckedCityNamesWithTheft}
						checkedCityName={checkedCityNamesWithTheft}
					/>
				</TabPanel>
				<TabPanel value={PoliceType.VIOLENCE}>
					<ViolentParts
						labels={labels}
						cityNames={cityNames}
						title={`연도별 / 지역별 강력범죄 추이 (${PoliceType.VIOLENCE})`}
						datas={datasForViolence}
						violenceResponse={violenceResponse}
						changeCheckedCityNames={changeCheckedCityNamesWithViolence}
						checkedCityName={checkedCityNamesWithViolence}
					/>
				</TabPanel>
			</TabContext>
		</div>
	);
};

ViolentMain.displayName = 'ViolentMain';

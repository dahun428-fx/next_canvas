import { CustomChart } from '@/components/common/utils/CustomChart';
import {
	CustomChartDoughnutData,
	CustomChartLineData,
} from '@/components/common/utils/CustomChart/CustomChart';
import { CustomCard } from '@/components/ui/card';
import { useSelector } from '@/store/hooks';
import { ViolenceState, selectViolence } from '@/store/modules/common/violence';
import { digit, percentage } from '@/utils/number';
import {
	PoliceYear,
	find_by_year_and_office,
	getDataByCriminal,
	getDataByYear,
	mergeByCityWithYear,
	policeCityArray,
} from '@/utils/openapi/police/police';
import {
	Box,
	Card,
	Divider,
	Grid,
	List,
	ListItem,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	styled,
	useTheme,
} from '@mui/material';
import React, {
	ChangeEvent,
	Suspense,
	useEffect,
	useMemo,
	useState,
} from 'react';
import styles from './NationWidePage.module.scss';
import { PoliceResourceYears } from '@/api/clients/services/open/police';
import { RegionResponse, RegionState } from '@/store/modules/common/region';
import {
	CrimeValueType,
	RegionItem,
	data_merge_by_cirme,
	data_merge_by_city,
} from '@/utils/openapi/region/region';
import {
	Police,
	SearchPoliceReseponse,
} from '@/models/api/open/police/SearchPoliceResponse';
import { RegionResourceYear } from '@/api/clients/services/open/region';
import { NationTitle } from './NationTitle';

type Props = {
	violenceItems: SearchPoliceReseponse[];
	regionItems: RegionResponse[];
};

export const NationWidePage: React.FC<Props> = ({
	regionItems,
	violenceItems,
}) => {
	const [nowYear, setNowYear] = useState<PoliceYear>('2022');
	const [selectedCity, setSelectedCity] = useState('서울');

	const dataByCityLabels = [...policeCityArray];
	const resourceYear = [...RegionResourceYear].reverse();

	const regionDatas = useMemo(() => {
		let result: RegionItem[] = [];
		regionItems.forEach(item => {
			if (item.year === nowYear) {
				result = item.items;
			}
		});
		return result;
	}, [nowYear, regionItems]);

	const regionMergedDataCrime = useMemo(() => {
		return data_merge_by_cirme(regionDatas);
	}, [regionDatas, nowYear]);

	const regionMergedDataCity = useMemo(() => {
		return data_merge_by_city(regionDatas);
	}, [regionDatas, nowYear]);

	const dataByOffice: Police | null = useMemo(() => {
		return find_by_year_and_office(violenceItems, nowYear);
	}, [violenceItems, nowYear]);

	const dataByCity: CustomChartLineData = useMemo(() => {
		return getDataByYear(violenceItems, nowYear, 'total');
	}, [violenceItems, nowYear]);
	console.log('data by city : ', dataByCity);
	const totalCountWithDataByCity = useMemo(() => {
		let totalcount = 0;
		dataByCityLabels.map(item => {
			totalcount += dataByCity[item];
		});
		return totalcount;
	}, [dataByCity]);

	const lowestCity = useMemo(() => {
		let minCity: string = '';
		let min: number = Number.MAX_SAFE_INTEGER;
		dataByCityLabels.forEach((item, index) => {
			if (min > dataByCity[item]) {
				minCity = item;
				min = dataByCity[item];
			}
		});
		return minCity;
	}, [dataByCity]);

	const highestCity = useMemo(() => {
		let maxCity: string = '';
		let max: number = 0;
		dataByCityLabels.forEach((item, index) => {
			if (max < dataByCity[item]) {
				maxCity = item;
				max = dataByCity[item];
			}
		});
		return maxCity;
	}, [dataByCity]);

	const lowestCrime: CrimeValueType = useMemo(() => {
		const keys = Object.keys(regionMergedDataCrime);
		let crimeName = '';
		let min = Number.MAX_SAFE_INTEGER;
		keys.forEach((item, index) => {
			const value = regionMergedDataCrime[item];
			if (min > value) {
				min = value;
				crimeName = item;
			}
		});
		return {
			crime: crimeName,
			count: regionMergedDataCrime[crimeName],
		};
	}, [regionMergedDataCrime]);
	const highestCrime: CrimeValueType = useMemo(() => {
		const keys = Object.keys(regionMergedDataCrime);
		let crimeName = '';
		let max = 0;
		keys.forEach((item, index) => {
			const value = regionMergedDataCrime[item];
			if (max < value) {
				max = value;
				crimeName = item;
			}
		});
		return {
			crime: crimeName,
			count: regionMergedDataCrime[crimeName],
		};
	}, [regionMergedDataCrime]);

	const dataByCriminalOne: CustomChartDoughnutData = useMemo(() => {
		return getDataByCriminal(violenceItems, nowYear, ['강도', '살인']);
	}, [violenceItems, nowYear]);
	const dataByCriminalTwo: CustomChartDoughnutData = useMemo(() => {
		return getDataByCriminal(violenceItems, nowYear, ['절도', '폭력']);
	}, [violenceItems, nowYear]);

	if (violenceItems.length < 1) {
		return null;
	}

	/*
        1. 2022 년도 총 범죄 건수
        2. 최다범죄발생지 / 최저범죄발생지
        3. 최다범죄 - 대분류 / - 중분류
           최저범죄 - 대분류 / - 중분류
        4. 2022 년도 살인 건수
        5. 가장 바쁜 경찰서
        6. 범죄 종류별 발생 건수
    */
	return (
		<Box>
			<Stack spacing={2}>
				<Box sx={{ padding: 1, margin: 1 }}>
					<NationTitle nowYear={nowYear} setNowYear={setNowYear} />
				</Box>
				<Divider />
				<Grid container>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard
							type="total"
							year={nowYear}
							totalCrimeCount={totalCountWithDataByCity}
						/>
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard
							type="MaxMin"
							year={nowYear}
							highestCity={highestCity}
							lowestCity={lowestCity}
						/>
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard
							type="crimeType"
							year={nowYear}
							lowestCrime={lowestCrime}
							highestCrime={highestCrime}
						/>
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard
							type="figure"
							year={nowYear}
							crimeData={regionMergedDataCrime}
						/>
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard type="police" year={nowYear} office={dataByOffice} />
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard
							type="category"
							year={nowYear}
							crimeData={regionMergedDataCity}
							selectedCity={`서울`}
						/>
					</Grid>
				</Grid>
				<Stack>
					<Card
						variant="outlined"
						sx={{
							overflow: 'auto',
							margin: 2,
							textAlign: 'center',
						}}
					>
						<Typography variant="overline" mt={1}>
							{nowYear}년도 전국 지역별 범죄상황
						</Typography>
						<Box
							sx={{
								minWidth: 700,
								overflow: 'auto',
							}}
						>
							<CustomChart
								dataLabels={dataByCityLabels}
								chartLineData={dataByCity}
								chartType="bar"
								// isResponseSive={false}
							/>
						</Box>
					</Card>
					<Card variant="outlined" sx={{ margin: 2, textAlign: 'center' }}>
						<TableContainer>
							<Table sx={{ minWidth: 700 }} aria-label="customized table">
								<TableHead>
									<TableRow>
										{dataByCityLabels.map((item, index) => {
											return <TableCell key={index}>{item}</TableCell>;
										})}
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										{dataByCityLabels.map((item, index) => {
											const value = dataByCity[item];
											const digited = `${digit(value)}`;
											const percent = `${percentage(value, totalCountWithDataByCity)}`;
											const label = `${digited} ( ${percent} ) `;
											return (
												<TableCell key={index} component="th" scope="row">
													{digited}
												</TableCell>
											);
										})}
									</TableRow>
									<TableRow>
										{dataByCityLabels.map((item, index) => {
											const value = dataByCity[item];
											const digited = `${digit(value)}`;
											const percent = `${percentage(value, totalCountWithDataByCity)}`;
											const label = `${digited} ( ${percent} ) `;
											return (
												<TableCell key={index} component="th" scope="row">
													{`${percent}`}
												</TableCell>
											);
										})}
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Card>
					<Grid container>
						<Grid item xs={6} sm={6} md={6}>
							<Card variant="outlined" sx={{ margin: 2, textAlign: 'center' }}>
								<Typography
									variant="overline"
									sx={{ margin: 2, textAlign: 'center' }}
								>
									{nowYear}년도 범죄별 통계
									{`  [${Object.keys(dataByCriminalOne).toString()}]`}
								</Typography>
								<Box
									sx={{
										height: '350px',
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<CustomChart
										className={styles.gap}
										dataLabels={Object.keys(dataByCriminalOne)}
										chartDoughnutData={dataByCriminalOne}
										chartType="doughnut"
										labelPositon="bottom"
										// isResponseSive={false}
										needDigit
										needPercent
									/>
								</Box>
							</Card>
						</Grid>
						<Grid item xs={6} sm={6} md={6}>
							<Card variant="outlined" sx={{ margin: 2, textAlign: 'center' }}>
								<Typography
									variant="overline"
									sx={{ margin: 2, textAlign: 'center' }}
								>
									{nowYear}년도 범죄별 통계
									{`  [${Object.keys(dataByCriminalTwo).toString()}]`}
								</Typography>
								<Box
									sx={{
										height: '350px',
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<CustomChart
										className={styles.gap}
										dataLabels={Object.keys(dataByCriminalTwo)}
										chartDoughnutData={dataByCriminalTwo}
										chartType="doughnut"
										labelPositon="bottom"
										colors={['#7B68EE', '#32CD32']}
										// isResponseSive={false}
										needDigit
										needPercent
									/>
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Stack>
			</Stack>
		</Box>
	);
};

NationWidePage.displayName = 'NationWidePage';

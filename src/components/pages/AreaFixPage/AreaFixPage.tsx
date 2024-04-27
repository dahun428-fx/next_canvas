import { RegionState } from '@/store/modules/common/region';
import { ViolenceState } from '@/store/modules/common/violence';
import {
	Box,
	Card,
	Divider,
	Grid,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { ViolentData } from '../Violent/ViolentMain';
import {
	get_data_by_city,
	mergeByCityWithYear,
} from '@/utils/openapi/police/police';
import { CustomChart } from '@/components/common/utils/CustomChart';
import { PoliceResourceYears } from '@/api/clients/services/open/police';
import {
	CrimeMainCategory,
	RegionItem,
	changeToChartData,
	changeToChartDataSub,
	data_merge_by_cirme_city,
	data_merge_by_city,
	makeDoughnutLabels,
	regionCityArray,
} from '@/utils/openapi/region/region';
import { digit } from '@/utils/number';
import styles from './AreaFixPage.module.scss';
import { CustomCard } from '@/components/ui/card';

type Props = {
	violenceResponse: ViolenceState;
	regionResponse: RegionState;
};

export const AreaFixPage: React.FC<Props> = ({
	violenceResponse,
	regionResponse,
}) => {
	const [selectedCityName, setSelectedCityName] = useState('서울');
	const [selectedYear, setSelectedYear] = useState('2022');

	const resourceCity = [...regionCityArray];
	const dataYears = [...PoliceResourceYears];
	const datasForMurderAndRobber = useMemo(() => {
		let result: ViolentData[] = [];

		get_data_by_city(violenceResponse.items, selectedCityName).forEach(
			(item, index) => {
				if (item.label === '강도' || item.label === '살인') {
					result.push(item);
				}
			}
		);
		return result;
	}, [violenceResponse.items, selectedCityName]);
	const datasForViolenceAndStolen = useMemo(() => {
		let result: ViolentData[] = [];

		get_data_by_city(violenceResponse.items, selectedCityName).forEach(
			(item, index) => {
				if (item.label === '절도' || item.label === '폭력') {
					result.push(item);
				}
			}
		);
		return result;
	}, [violenceResponse.items, selectedCityName]);
	const datasForTotal = useMemo(() => {
		let result: ViolentData[] = [];

		get_data_by_city(violenceResponse.items, selectedCityName).forEach(
			(item, index) => {
				if (item.label === '총합') {
					result.push(item);
				}
			}
		);
		return result;
	}, [violenceResponse.items, selectedCityName]);

	const highestCrimeTotal: { [k: string]: number } = useMemo(() => {
		let max = 0;
		let maxIdx = 0;
		if (datasForTotal.length > 0) {
			datasForTotal[0].data.forEach((item, index) => {
				if (max < item) {
					max = item;
					maxIdx = index;
				}
			});
		}
		const year = dataYears[maxIdx] ?? 0;
		const data = datasForTotal[0]?.data[maxIdx] ?? 0;

		return {
			[year]: data,
		};
	}, [datasForTotal]);

	const lowestCrimeTotal: { [k: string]: number } = useMemo(() => {
		let min = Number.MAX_SAFE_INTEGER;
		let minIdx = 0;
		if (datasForTotal.length > 0) {
			datasForTotal[0].data.forEach((item, index) => {
				if (min > item) {
					min = item;
					minIdx = index;
				}
			});
		}
		const year = dataYears[minIdx] ?? 0;
		const data = datasForTotal[0]?.data[minIdx] ?? 0;

		return {
			[year]: data,
		};
	}, [datasForTotal]);

	const selectedRegionData = useMemo(() => {
		const getDataByYear = regionResponse.items.filter(item => {
			if (item.year === selectedYear) {
				return item.items;
			}
		})[0];
		if (
			!getDataByYear ||
			!getDataByYear.items ||
			getDataByYear.items.length < 1
		) {
			return null;
		}

		const getDataByCityAndYear = getDataByYear.items.filter(item => {
			if (selectedCityName.includes(item.city_name)) {
				return item;
			}
		})[0];

		return getDataByCityAndYear;
	}, [selectedYear, selectedCityName, regionResponse.items]);

	const regionDatas = useMemo(() => {
		let result: RegionItem[] = [];
		regionResponse.items.forEach(item => {
			if (item.year === selectedYear) {
				result = item.items;
			}
		});
		return result;
	}, [selectedYear, regionResponse.items]);

	const regionMergedDataCity = useMemo(() => {
		return data_merge_by_city(regionDatas);
	}, [regionDatas, selectedYear]);

	const regionMergedDataCrimeCity = useMemo(() => {
		return data_merge_by_cirme_city(regionDatas, selectedCityName);
	}, [regionDatas, selectedYear, selectedCityName]);

	if (!selectedRegionData) {
		return null;
	}
	/**
	 *
	 *
	 * 1.
	 * 최다 범죄 발생 연도 : 2022 / 00건
	 * 최저 범죄 발생 연도 : 2020 / 00건,
	 *
	 * 2.
	 * 2022 년도 서울지역 총 범죄 건수
	 * 000건
	 *
	 * 3. 서울지역 최다 범죄
	 * 1위 : 00 / 00건 / 2위 00 / 00건 / 3위 00 / 00건
	 *
	 *
	 *
	 */
	return (
		<Box>
			<Stack spacing={2}>
				<Box sx={{ padding: 1, margin: 1 }}>
					<Typography variant="h6">
						<Select
							variant="standard"
							// select

							value={selectedCityName}
							defaultValue={selectedCityName}
							sx={{ height: '30px', width: '12ch', textAlign: 'center' }}
							onChange={(event: SelectChangeEvent) => {
								setSelectedCityName(event.target.value as string);
							}}
						>
							{resourceCity.map(item => {
								return (
									<MenuItem key={item} value={item}>
										{item}
									</MenuItem>
								);
							})}
						</Select>
						{`지역 범죄 발생현황`}
					</Typography>
				</Box>
				<Divider />
				<Grid container>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard
							type="category"
							year={selectedYear}
							crimeData={regionMergedDataCity}
							selectedCity={selectedCityName}
						/>
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard
							type="MaxMinYear"
							highestYearData={highestCrimeTotal}
							lowestYearData={lowestCrimeTotal}
							selectedCity={selectedCityName}
						/>
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard
							type="figure"
							year={selectedYear}
							crimeData={regionMergedDataCrimeCity}
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
						<Typography mt={2}>
							{`${selectedCityName} 지역 연도별 범죄 추이`}
						</Typography>
						<Stack direction={'row'} mt={2}>
							<Box
								sx={{
									minWidth: 700,
									overflow: 'auto',
								}}
							>
								<CustomChart
									dataLabels={dataYears}
									chartLineDataArray={datasForMurderAndRobber}
									colors={['#87CEEB', '#E6A4B4']}
									chartType="line"
									labelPositon="bottom"
									// isResponseSive={false}
								/>
							</Box>
							<Divider variant="middle" flexItem />
							<Box
								sx={{
									minWidth: 700,
									overflow: 'auto',
								}}
							>
								<CustomChart
									dataLabels={dataYears}
									chartLineDataArray={datasForViolenceAndStolen}
									chartType="line"
									colors={['#A0D8EF', '#F498AD']}
									labelPositon="bottom"
									// isResponseSive={false}
								/>
							</Box>
						</Stack>
					</Card>
					<Card variant="outlined" sx={{ margin: 2, textAlign: 'center' }}>
						<TableContainer>
							<Table sx={{ minWidth: 700 }} aria-label="customized table">
								<TableHead>
									<TableRow>
										<TableCell></TableCell>
										{PoliceResourceYears.map((item, index) => {
											return <TableCell key={`${index}`}>{item}</TableCell>;
										})}
									</TableRow>
								</TableHead>
								<TableBody>
									{datasForMurderAndRobber.map((item, index) => {
										const data = item.data;
										return (
											<TableRow key={index}>
												<TableCell>{item.label}</TableCell>
												{data.map((_data, _index) => {
													return (
														<TableCell key={`${index}_${index}`}>
															{digit(_data)}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
									{datasForViolenceAndStolen.map((item, index) => {
										const data = item.data;
										return (
											<TableRow key={index}>
												<TableCell>{item.label}</TableCell>
												{data.map((_data, _index) => {
													return (
														<TableCell key={`${index}_${index}`}>
															{digit(_data)}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
									{datasForTotal.map((item, index) => {
										const data = item.data;
										return (
											<TableRow key={index}>
												<TableCell>{item.label}</TableCell>
												{data.map((_data, _index) => {
													return (
														<TableCell key={`${index}_${index}`}>
															{digit(_data)}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Card>
					<Box sx={{ padding: 1, margin: 1 }}>
						<Select
							variant="standard"
							// select

							value={selectedYear}
							defaultValue={selectedYear}
							sx={{ height: '30px', width: '12ch', textAlign: 'center' }}
							onChange={(event: SelectChangeEvent) => {
								setSelectedYear(event.target.value as string);
							}}
						>
							{[...dataYears].reverse().map(item => {
								return (
									<MenuItem key={item} value={item}>
										{item}
									</MenuItem>
								);
							})}
						</Select>
					</Box>
					<Divider flexItem />
					<Grid container>
						<Grid item xs={12} sm={6} md={6}>
							<Card variant="outlined" sx={{ margin: 2, textAlign: 'center' }}>
								<Typography
									variant="overline"
									sx={{ margin: 2, textAlign: 'center' }}
								>
									{`${selectedYear} 년도 ${selectedCityName} 지역 범죄 대분류`}
								</Typography>
								<Box
									sx={{
										height: '700px',
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<CustomChart
										className={styles.areaChar}
										dataLabels={makeDoughnutLabels(
											changeToChartData(selectedRegionData?.category),
											selectedRegionData?.totalCount
										)}
										chartDoughnutData={changeToChartData(
											selectedRegionData?.category
										)}
										chartType={'doughnut'}
										labelPositon="left"
									/>
								</Box>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<Grid container>
								{Object.keys(CrimeMainCategory).map((item, index) => {
									const data = selectedRegionData;
									const title = `${data.year} 년도 ${data.city_name} 지역 범죄 중분류 차트 - ${item}`;
									const adjustData = changeToChartDataSub(data.category, item);
									let totalcount = Object.values(adjustData).reduce(
										(prev, curr) => {
											return curr + prev;
										},
										0
									);
									return (
										<Grid key={index} item xs={6} sm={6} md={6}>
											<Card
												variant="outlined"
												sx={{ margin: 2, textAlign: 'center' }}
											>
												<Typography
													variant="overline"
													sx={{ margin: 2, textAlign: 'center' }}
												>
													{title}
												</Typography>
												<Box
													sx={{
														minHeight: '350px',
														display: 'flex',
														justifyContent: 'center',
													}}
												>
													<CustomChart
														dataLabels={makeDoughnutLabels(adjustData)}
														chartDoughnutData={adjustData}
														chartType={'doughnut'}
														labelPositon="left"
													/>
												</Box>
											</Card>
										</Grid>
									);
								})}
							</Grid>
						</Grid>
					</Grid>
				</Stack>
			</Stack>
		</Box>
	);
};

AreaFixPage.displayName = 'AreaFixPage';

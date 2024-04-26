import { RegionState } from '@/store/modules/common/region';
import { ViolenceState } from '@/store/modules/common/violence';
import {
	Box,
	Card,
	Divider,
	Grid,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { ViolentData } from '../Violent/ViolentMain';
import {
	get_data_by_city,
	mergeByCityWithYear,
} from '@/utils/openapi/police/police';
import { CustomChart } from '@/components/common/utils/CustomChart';
import { PoliceResourceYears } from '@/api/clients/services/open/police';
import {
	CrimeMainCategory,
	changeToChartData,
	changeToChartDataSub,
	makeDoughnutLabels,
} from '@/utils/openapi/region/region';
import { digit } from '@/utils/number';

type Props = {
	violenceResponse: ViolenceState;
	regionResponse: RegionState;
};

export const AreaFixPage: React.FC<Props> = ({
	violenceResponse,
	regionResponse,
}) => {
	const selectedCityName = '서울';
	const selectedYear = '2022';
	const dataYears = PoliceResourceYears;
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
		// console.log(
		// 	'selectedYear, selectedItem ===> ',
		// 	selectedYear,
		// 	selectedCity,
		// 	getDataByYear,
		// 	getDataByCityAndYear
		// );
		// console.log('getDataByYear ===> ', getDataByYear);

		return getDataByCityAndYear;
	}, [selectedYear, selectedCityName, regionResponse.items]);

	console.log('selectedRegionData', selectedRegionData);
	if (!selectedRegionData) {
		return null;
	}
	return (
		<Box>
			<Stack spacing={2}>
				<Box>
					<Typography variant="h6">지역 범죄 발생현황</Typography>
				</Box>
				<Divider />
				<Grid container></Grid>
				<Stack>
					<Card
						variant="outlined"
						sx={{
							overflow: 'auto',
							margin: 2,
							textAlign: 'center',
						}}
					>
						<Typography mt={2}>년도 전국 지역별 범죄상황</Typography>
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
					<Card>
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
											<TableRow>
												<TableCell>{item.label}</TableCell>
												{data.map((_data, _index) => {
													return <TableCell>{digit(_data)}</TableCell>;
												})}
											</TableRow>
										);
									})}
									{datasForViolenceAndStolen.map((item, index) => {
										const data = item.data;
										return (
											<TableRow>
												<TableCell>{item.label}</TableCell>
												{data.map((_data, _index) => {
													return <TableCell>{digit(_data)}</TableCell>;
												})}
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Card>
					<Card>
						<CustomChart
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
					</Card>
					<Card>
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
								<CustomChart
									dataLabels={makeDoughnutLabels(adjustData, totalcount)}
									chartDoughnutData={adjustData}
									chartType={'doughnut'}
									labelPositon="left"
								/>
							);
						})}
					</Card>
				</Stack>
			</Stack>
		</Box>
	);
};

AreaFixPage.displayName = 'AreaFixPage';

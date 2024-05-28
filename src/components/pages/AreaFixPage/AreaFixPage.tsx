import { RegionResponse, RegionState } from '@/store/modules/common/region';
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
import { MultiChartDataType } from '@/components/ui/chart/CustomChart';
import { ChartBox } from '@/components/ui/chart/chartBox';
import { RegionResourceYear } from '@/api/clients/services/open/region';
import { AreaFixCardList } from './AreaFixCardList';
import { AreaFixCategoryList } from './AreaFixCategoryList';
import { AreaFixTable } from './AreaFixTable';
import { AreaFixMainChart } from './AreaFixMainChart';

type Props = {
	regionItems: RegionResponse[];
	multiChartDataFromCity: (city: string) => MultiChartDataType[];
};

export const AreaFixPage: React.FC<Props> = ({
	regionItems,
	multiChartDataFromCity,
}) => {
	const [selectedCityName, setSelectedCityName] = useState('서울');
	const [selectedYear, setSelectedYear] = useState('2022');

	const resourceCity = [...regionCityArray];
	const dataYears = [...RegionResourceYear];
	const datasForMurderAndRobber = useMemo(() => {
		let result: MultiChartDataType[] = [];

		multiChartDataFromCity(selectedCityName).forEach((item, index) => {
			if (item.label === '강도' || item.label === '살인') {
				result.push(item);
			}
		});
		return result;
	}, [selectedCityName]);
	const datasForViolenceAndStolen = useMemo(() => {
		let result: MultiChartDataType[] = [];

		multiChartDataFromCity(selectedCityName).forEach((item, index) => {
			if (item.label === '절도' || item.label === '폭력') {
				result.push(item);
			}
		});
		return result;
	}, [selectedCityName]);
	const datasForTotal = useMemo(() => {
		let result: MultiChartDataType[] = [];

		multiChartDataFromCity(selectedCityName).forEach((item, index) => {
			if (item.label === '총합') {
				result.push(item);
			}
		});
		return result;
	}, [selectedCityName]);

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
		const getDataByYear = regionItems.filter(item => {
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
	}, [selectedYear, selectedCityName, regionItems]);

	const regionDatas = useMemo(() => {
		let result: RegionItem[] = [];
		regionItems.forEach(item => {
			if (item.year === selectedYear) {
				result = item.items;
			}
		});
		return result;
	}, [selectedYear, regionItems]);

	const regionMergedDataCity: Record<string, number> = useMemo(() => {
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
				<AreaFixCardList
					{...{
						datasForTotal,
						regionDatas,
						selectedCityName,
						selectedYear,
					}}
				/>
				<Stack>
					<AreaFixMainChart
						{...{
							datasForMurderAndRobber,
							datasForViolenceAndStolen,
							selectedCityName,
						}}
					/>
					<AreaFixTable
						{...{
							datasForMurderAndRobber,
							datasForTotal,
							datasForViolenceAndStolen,
						}}
					/>
					{selectedRegionData && (
						<AreaFixCategoryList
							{...{
								selectedCityName,
								selectedRegionData,
								selectedYear,
								setSelectedYear,
							}}
						/>
					)}
				</Stack>
			</Stack>
		</Box>
	);
};

AreaFixPage.displayName = 'AreaFixPage';

import { RegionResponse } from '@/store/modules/common/region';
import {
	Box,
	Divider,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { RegionItem, regionCityArray } from '@/utils/openapi/region/region';
import { MultiChartDataType } from '@/components/ui/chart/CustomChart';
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
						regionItems,
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
					<AreaFixCategoryList
						{...{
							selectedCityName,
							selectedYear,
							regionItems,
							setSelectedYear,
						}}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};

AreaFixPage.displayName = 'AreaFixPage';

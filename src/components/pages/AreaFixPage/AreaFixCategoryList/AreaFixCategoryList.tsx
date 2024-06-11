import { ChartBox } from '@/components/ui/chart/chartBox';
import {
	Box,
	Divider,
	Grid,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import styles from '../AreaFixPage.module.scss';
import {
	CrimeMainCategory,
	RegionItem,
	changeToChartData,
	changeToChartDataSub,
	makeDoughnutLabels,
} from '@/utils/openapi/region/region';
import { RegionResourceYear } from '@/api/clients/services/open/region';
import { RegionResponse } from '@/store/modules/common/region';
import { useMemo } from 'react';

type Props = {
	selectedYear: string;
	selectedCityName: string;
	regionItems: RegionResponse[];
	setSelectedYear: (value: string) => void;
};

export const AreaFixCategoryList: React.FC<Props> = ({
	selectedCityName,
	regionItems,
	selectedYear,
	setSelectedYear,
}) => {
	const dataYears = [...RegionResourceYear];

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

	if (!selectedRegionData) {
		return null;
	}

	return (
		<>
			<Box sx={{ padding: 1, margin: 1 }}>
				<Select
					variant="standard"
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
				<Grid item xs={12} sm={12} md={12}>
					<ChartBox
						titleStyle={{
							margin: 2,
							textAlign: 'center',
						}}
						title={`${selectedYear} 년도 ${selectedCityName} 지역 범죄 대분류`}
						boxStyle={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
						}}
						cardStyle={{ margin: 2, textAlign: 'center' }}
						chartData={{
							className: styles.areaChar,
							chartLabels: Object.keys(
								changeToChartData(selectedRegionData?.category)
							),
							chartType: 'doughnut',
							data: changeToChartData(selectedRegionData?.category),
							labelPositon: 'left',
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<Grid container>
						{Object.keys(CrimeMainCategory).map((item, index) => {
							const data = selectedRegionData;
							const title = `${data.year} 년도 ${data.city_name} 지역 범죄 중분류 차트 - ${item}`;
							const adjustData = changeToChartDataSub(data.category, item);

							return (
								<Grid key={index} item xs={12} sm={6} md={6}>
									<ChartBox
										cardStyle={{
											margin: 2,
											textAlign: 'center',
										}}
										title={title}
										titleStyle={{
											margin: 2,
											textAlign: 'center',
										}}
										boxStyle={{
											width: '100%',
											minHeight: '350px',
											display: 'flex',
											justifyContent: 'center',
										}}
										chartData={{
											chartLabels: Object.keys(adjustData),
											chartType: 'doughnut',
											labelPositon: 'left',
											data: adjustData,
											digitOff: true,
										}}
									/>
								</Grid>
							);
						})}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

AreaFixCategoryList.displayName = 'AreaFixCategoryList';

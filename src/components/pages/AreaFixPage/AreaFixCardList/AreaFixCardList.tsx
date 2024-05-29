import { RegionResourceYear } from '@/api/clients/services/open/region';
import { CustomCard } from '@/components/ui/card';
import { MultiChartDataType } from '@/components/ui/chart/CustomChart';
import { RegionResponse } from '@/store/modules/common/region';
import {
	RegionItem,
	data_merge_by_cirme_city,
	data_merge_by_city,
} from '@/utils/openapi/region/region';
import { Grid } from '@mui/material';
import { useMemo } from 'react';

type Props = {
	selectedYear: string;
	selectedCityName: string;
	regionItems: RegionResponse[];
	datasForTotal: MultiChartDataType[];
};

export const AreaFixCardList: React.FC<Props> = ({
	regionItems,
	selectedCityName,
	selectedYear,
	datasForTotal,
}) => {
	const dataYears = [...RegionResourceYear];

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

	const highestCrimeTotal: Record<string, number> = useMemo(() => {
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

	const lowestCrimeTotal: Record<string, number> = useMemo(() => {
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

	return (
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
	);
};

AreaFixCardList.displayName = 'AreaFixCardList';

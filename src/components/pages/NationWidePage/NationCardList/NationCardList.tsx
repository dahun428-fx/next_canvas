import { CustomCard } from '@/components/ui/card';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { RegionResponse } from '@/store/modules/common/region';
import { PoliceYearType } from '@/utils/openapi/police/data';
import {
	RegionItem,
	data_merge_by_cirme,
	data_merge_by_city,
} from '@/utils/openapi/region/region';
import { Grid } from '@mui/material';
import { useMemo } from 'react';

type Props = {
	nowYear: string;
	violenceItems: SearchPoliceReseponse[];
	policeYearlyData: PoliceYearType[];
	regionItems: RegionResponse[];
};
type CrimeValueType = {
	crime: string;
	count: number;
};

/**
 * NationCardList Component
 * @param param0
 * @returns
 */
export const NationCardList: React.FC<Props> = ({
	nowYear,
	violenceItems,
	policeYearlyData,
	regionItems,
}) => {
	const filteredViolenceData = useMemo(() => {
		return violenceItems.filter(item => item.year === nowYear)[0]?.data ?? null;
	}, [nowYear, violenceItems]);

	const filteredPoliceData: PoliceYearType = useMemo(() => {
		return policeYearlyData.filter(item => item.year === nowYear)[0] ?? null;
	}, [nowYear, policeYearlyData]);

	const filteredRegionData: RegionItem[] = useMemo(() => {
		return regionItems.filter(item => item.year === nowYear)[0]?.items ?? null;
	}, [nowYear, regionItems]);

	const totalCountByYear = useMemo(() => {
		return filteredPoliceData?.totalCount ?? 0;
	}, [filteredPoliceData]);

	const lowestCity = useMemo(() => {
		let min: number = Number.MAX_SAFE_INTEGER;
		let cityname: string = '';
		filteredPoliceData?.data?.forEach(item => {
			if (min > item.totalCount) {
				min = item.totalCount;
				cityname = item.city;
			}
		});
		return cityname;
	}, [filteredPoliceData]);

	const highestCity = useMemo(() => {
		let max: number = 0;
		let cityname: string = '';
		filteredPoliceData?.data?.forEach(item => {
			if (max < item.totalCount) {
				max = item.totalCount;
				cityname = item.city;
			}
		});
		return cityname;
	}, [filteredPoliceData]);

	const regionMergedDataCrime = useMemo(() => {
		return data_merge_by_cirme(filteredRegionData);
	}, [filteredRegionData, nowYear]);

	const regionMergedDataCity = useMemo(() => {
		return data_merge_by_city(filteredRegionData);
	}, [filteredRegionData, nowYear]);

	const lowestCrime: CrimeValueType = useMemo(() => {
		const keys = Object.keys(regionMergedDataCrime);
		let crimeName = '';
		let min = Number.MAX_SAFE_INTEGER;
		keys.forEach((item, index) => {
			const value = regionMergedDataCrime[item];
			if (!(value <= 0)) {
				if (min > value) {
					min = value;
					crimeName = item;
				}
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

	const officeData = useMemo(() => {
		return filteredViolenceData[0];
	}, [filteredViolenceData]);

	return (
		<Grid container>
			<Grid item xs={12} md={4} sm={4}>
				<CustomCard
					type="total"
					year={nowYear}
					totalCrimeCount={totalCountByYear}
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
				<CustomCard type="police" year={nowYear} office={officeData} />
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
	);
};
NationCardList.displayName = 'NationCardList';

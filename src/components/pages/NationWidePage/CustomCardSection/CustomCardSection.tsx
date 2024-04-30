import { CustomCard } from '@/components/ui/card';
import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import { CrimeValueType, regionCityArray } from '@/utils/openapi/region/region';
import { Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
	nowYear: string;
	totalCrimeCount: number;
	highestCity: string;
	lowestCity: string;
	lowestCrime: CrimeValueType;
	highestCrime: CrimeValueType;
	regionMergedDataCrime: { [k: string]: number };
	regionMergedDataCity: { [k: string]: number };
	office: Police | null;
};
export const CustomCardSection: React.FC<Props> = ({
	regionMergedDataCity,
	regionMergedDataCrime,
	office,
	highestCrime,
	lowestCrime,
	highestCity,
	lowestCity,
	nowYear,
	totalCrimeCount,
}) => {
	const cities = [...regionCityArray];

	const [selectedCity, setSelectedCity] = useState<string>('서울');
	const [crimeDataIdx, setCrimeDataIdx] = useState<number>(0);

	const onChangeSelectedCity = (direction: 'left' | 'right') => {
		const foundIndex = cities.findIndex(item => item === selectedCity);
		if (foundIndex > -1) {
			let max = cities.length - 1;
			let idx = direction === 'right' ? foundIndex + 1 : foundIndex - 1;

			if (idx > max) {
				idx = 0;
			}
			if (idx < 0) {
				idx = max;
			}
			setSelectedCity(cities[idx]);
		}
	};

	const onChangeCrimeDataForFigureIndex = (direction: 'left' | 'right') => {
		let max = Object.keys(regionMergedDataCrime).length - 1;
		let idx = direction === 'right' ? crimeDataIdx + 1 : crimeDataIdx - 1;
		if (idx > max) {
			idx = 0;
		}
		if (idx < 0) {
			idx = max;
		}
		setCrimeDataIdx(idx);
	};

	return (
		<Grid container>
			<Grid item xs={12} md={4} sm={4}>
				<CustomCard
					type="total"
					year={nowYear}
					totalCrimeCount={totalCrimeCount}
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
					figureIdx={crimeDataIdx}
					isArrow
					onClickArrow={onChangeCrimeDataForFigureIndex}
				/>
			</Grid>
			<Grid item xs={12} md={4} sm={4}>
				<CustomCard type="police" year={nowYear} office={office} />
			</Grid>
			<Grid item xs={12} md={4} sm={4}>
				<CustomCard
					type="category"
					year={nowYear}
					crimeData={regionMergedDataCity}
					selectedCity={selectedCity}
					isArrow
					onClickArrow={onChangeSelectedCity}
				/>
			</Grid>
		</Grid>
	);
};

CustomCardSection.displayName = 'CustomCardSection';

import { PoliceYearType } from '@/utils/openapi/police/data';
import { Grid } from '@mui/material';
import { useMemo } from 'react';
import { NationChartItem } from './NationChartItem';

type Props = {
	nowYear: string;
	policeYearlyData: PoliceYearType[];
};

const CrimeType = {
	ROBBER: '강도',
	MURDER: '살인',
	THEFT: '절도',
	VIOLENCE: '폭력',
} as const;

type CrimeType = (typeof CrimeType)[keyof typeof CrimeType];

export const NationChartList: React.FC<Props> = ({
	nowYear,
	policeYearlyData,
}) => {
	const filteredData = useMemo(() => {
		return policeYearlyData.filter(item => item.year === nowYear);
	}, [nowYear, policeYearlyData]);

	const crimeChartDatas_Robber_Murder = useMemo(() => {
		const map = new Map<string, number>();

		filteredData.forEach(item => {
			item.data.forEach(_d => {
				map.set(CrimeType.ROBBER, (map.get(CrimeType.ROBBER) ?? 0) + _d.강도);
				map.set(CrimeType.MURDER, (map.get(CrimeType.MURDER) ?? 0) + _d.살인);
			});
		});
		return Object.fromEntries(map);
	}, [nowYear, filteredData]);

	const crimeChartDatas_Theft_Violence = useMemo(() => {
		const map = new Map<string, number>();

		filteredData.forEach(item => {
			item.data.forEach(_d => {
				map.set(CrimeType.THEFT, (map.get(CrimeType.ROBBER) ?? 0) + _d.절도);
				map.set(CrimeType.VIOLENCE, (map.get(CrimeType.ROBBER) ?? 0) + _d.폭력);
			});
		});
		return Object.fromEntries(map);
	}, [nowYear, filteredData]);

	if (!filteredData) {
		return null;
	}

	return (
		<Grid container>
			<Grid item xs={6} sm={6} md={6}>
				<NationChartItem
					chartDatas={crimeChartDatas_Robber_Murder}
					nowYear={nowYear}
				/>
			</Grid>
			<Grid item xs={6} sm={6} md={6}>
				<NationChartItem
					chartDatas={crimeChartDatas_Theft_Violence}
					nowYear={nowYear}
					colors={['#7B68EE', '#32CD32']}
				/>
			</Grid>
		</Grid>
	);
};
NationChartList.displayName = 'NationChartList';

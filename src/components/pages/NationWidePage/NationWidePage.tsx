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
import {
	PoliceCityMergedType,
	PoliceYearType,
} from '@/utils/openapi/police/data';
import { NationCardList } from './NationCardList';
import { NationMainChart } from './NationMainChart';
import { NationMainTable } from './NationMainTable';

type Props = {
	violenceItems: SearchPoliceReseponse[];
	regionItems: RegionResponse[];
	policeTotalData: PoliceCityMergedType[];
	policeYearlyData: PoliceYearType[];
};

export const NationWidePage: React.FC<Props> = ({
	regionItems,
	violenceItems,
	policeTotalData,
	policeYearlyData,
}) => {
	const [nowYear, setNowYear] = useState<PoliceYear>('2022');
	const [selectedCity, setSelectedCity] = useState('서울');

	const dataByCityLabels = [...policeCityArray];

	const dataByCity: CustomChartLineData = useMemo(() => {
		return getDataByYear(violenceItems, nowYear, 'total');
	}, [violenceItems, nowYear]);

	const totalCountByYear = useMemo(() => {
		return policeYearlyData.filter(item => item.year === nowYear)[0].totalCount;
	}, [nowYear]);

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
				<NationCardList
					{...{
						nowYear,
						policeYearlyData,
						violenceItems,
						regionItems,
					}}
				/>
				<Stack>
					<NationMainChart
						{...{
							nowYear,
							policeYearlyData,
						}}
					/>
					<NationMainTable
						{...{
							nowYear,
							policeYearlyData,
						}}
					/>
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

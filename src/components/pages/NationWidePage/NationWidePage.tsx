import { CustomChart } from '@/components/common/utils/CustomChart';
import {
	CustomChartDoughnutData,
	CustomChartLineData,
} from '@/components/common/utils/CustomChart/CustomChart';
import { CustomCard } from '@/components/ui/card';
import { useSelector } from '@/store/hooks';
import { ViolenceState, selectViolence } from '@/store/modules/common/violence';
import {
	getDataByCriminal,
	getDataByYear,
	mergeByCityWithYear,
	policeCityArray,
} from '@/utils/openapi/police/police';
import {
	Box,
	Card,
	Grid,
	List,
	ListItem,
	Paper,
	Stack,
	Typography,
	styled,
	useTheme,
} from '@mui/material';
import React, { Suspense, useMemo, useState } from 'react';

type Props = {
	violenceResponse: ViolenceState;
};

export const NationWidePage: React.FC<Props> = ({ violenceResponse }) => {
	const theme = useTheme();

	// const [yearIndex, setYearIndex] = useState(8);
	const dataByCityLabels = policeCityArray;

	// const dataByCity: CustomChartDoughnutData = useMemo(() => {
	// 	return getDataByYear(violenceResponse.items, '2022', 'total');
	// }, [violenceResponse.items]);
	const dataByCity: CustomChartLineData = useMemo(() => {
		return getDataByYear(violenceResponse.items, '2022', 'total');
	}, [violenceResponse.items]);

	// console.log('data ===> ', dataByCity);
	const DemoPaper = styled(Paper)(({ theme }) => ({
		// width: 120,
		// height: 120,
		padding: theme.spacing(2),
		...theme.typography.body2,
		// textAlign: 'center',
	}));

	const dataByCriminalOne: CustomChartDoughnutData = useMemo(() => {
		return getDataByCriminal(violenceResponse.items, '2022', ['강도', '살인']);
	}, [violenceResponse]);
	const dataByCriminalTwo: CustomChartDoughnutData = useMemo(() => {
		return getDataByCriminal(violenceResponse.items, '2022', ['절도', '폭력']);
	}, [violenceResponse]);
	// console.log('dataByCriminal', dataByCriminal);

	// console.log('compare data', mergeByCityWithYear(violenceResponse.items));
	if (violenceResponse.items.length < 1) {
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
				<Grid container>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard type="total" />
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard type="MaxMin" />
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard type="crimeType" />
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard type="figure" />
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard type="police" />
					</Grid>
					<Grid item xs={12} md={4} sm={4}>
						<CustomCard type="category" />
					</Grid>
				</Grid>

				<Grid container spacing={1}>
					<Grid item xs={12} md={12} sm={12}>
						<Card variant="outlined" sx={{ padding: 2, textAlign: 'center' }}>
							<Grid container spacing={1}>
								<Grid item xs={10} md={10} sm={10}>
									<CustomChart
										dataLabels={dataByCityLabels}
										chartLineData={dataByCity}
										chartType="bar"
										// isResponseSive={false}
									/>
								</Grid>
								<Grid item xs={2} md={2} sm={2}>
									<Card sx={{ padding: 1 }} variant="outlined">
										<List>
											{dataByCityLabels.map((item, index) => {
												return (
													<ListItem key={`${item}`}>
														<Typography variant="overline">{item}</Typography>
													</ListItem>
												);
											})}
										</List>
									</Card>
								</Grid>
							</Grid>
						</Card>
					</Grid>
					{/* <Grid item xs={2} md={2} sm={2}>
						<Card variant="outlined"></Card>
					</Grid> */}
				</Grid>
				<Grid container>
					<Grid item xs={6} md={6} sm={6} sx={{ margin: 1 }}>
						<CustomChart
							dataLabels={Object.keys(dataByCriminalOne)}
							chartDoughnutData={dataByCriminalOne}
							chartType="doughnut"
							labelPositon="left"
							isResponseSive={false}
						/>
					</Grid>
					<Grid item xs={6} md={6} sm={6}>
						<CustomChart
							dataLabels={Object.keys(dataByCriminalTwo)}
							chartDoughnutData={dataByCriminalTwo}
							colors={['#7B68EE', '#32CD32']}
							chartType="doughnut"
							labelPositon="left"
							isResponseSive={false}
						/>
					</Grid>
				</Grid>
			</Stack>
		</Box>
	);
};

NationWidePage.displayName = 'NationWidePage';

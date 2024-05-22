import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import { digit } from '@/utils/number';
import { CrimeValueType } from '@/utils/openapi/region/region';
import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

export type CardContentType =
	| 'total'
	| 'MaxMin'
	| 'crimeType'
	| 'figure'
	| 'police'
	| 'category'
	| 'MaxMinYear';

type Props = {
	type?: CardContentType;
	year?: string;
	totalCrimeCount?: number;
	lowestCity?: string;
	highestCity?: string;
	lowestCrime?: CrimeValueType;
	highestCrime?: CrimeValueType;
	crimeData?: { [k: string]: number };
	office?: Police | null;
	selectedCity?: string;
	lowestYearData?: { [key: string]: number };
	highestYearData?: { [key: string]: number };
};

export const CustomCard: React.FC<Props> = ({ type, ...props }) => {
	const cardContent = () => {
		if (type === 'total') {
			return <TotalCriminalContent {...props} />;
		} else if (type === 'MaxMin') {
			return <MaxMinContent {...props} />;
		} else if (type === 'crimeType') {
			return <CrimeTypeContent {...props} />;
		} else if (type === 'figure') {
			return <FigureOutContent {...props} />;
		} else if (type === 'police') {
			return <PoliceOfficeContent {...props} />;
		} else if (type === 'category') {
			return <CategoryCountContent {...props} />;
		} else if (type === 'MaxMinYear') {
			return <MaxMinYear {...props} />;
		}
		return <div></div>;
	};
	return (
		<Box sx={{ maxWidth: 400, minWidth: 200, margin: 1 }}>
			<Card sx={{ height: 200 }} variant="outlined">
				{type && cardContent()}
			</Card>
		</Box>
	);
};

CustomCard.displayName = 'CustomCard';

const titleFontSize = 12;

const TotalCriminalContent: React.FC<Props> = ({ year, totalCrimeCount }) => {
	return (
		<CardContent>
			<Typography
				component="div"
				sx={{ mb: 1.5 }}
				color="text.secondary"
				variant="overline"
			>
				{year}년
			</Typography>
			<Box mt={2}>
				<Typography
					component="div"
					sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
				>
					총 범죄 건수
				</Typography>
				<Typography
					variant="h6"
					component="div"
					mt={2}
					sx={{ color: '#1976d2', textAlign: 'right' }}
				>
					{totalCrimeCount && `${digit(totalCrimeCount)} 건`}
				</Typography>
			</Box>
		</CardContent>
	);
};
const MaxMinContent: React.FC<Props> = ({ year, highestCity, lowestCity }) => {
	return (
		<CardContent>
			<Typography
				component="div"
				sx={{ mb: 1.5 }}
				color="text.secondary"
				variant="overline"
			>
				{year}년
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				최다 범죄 발생지
			</Typography>
			<Typography
				variant="h6"
				component="div"
				textAlign={'right'}
				ml={4}
				sx={{ color: '#1976d2', textAlign: 'right' }}
			>
				{highestCity}
			</Typography>
			<Typography
				mt={1}
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				최저 범죄 발생지
			</Typography>
			<Typography
				variant="h6"
				component="div"
				textAlign={'right'}
				ml={4}
				sx={{
					color: '#1976d2',
					textAlign: 'right',
				}}
			>
				{lowestCity}
			</Typography>
		</CardContent>
	);
};

const FigureOutContent: React.FC<Props> = ({ year, crimeData }) => {
	if (!crimeData) return null;
	const index = 0;
	const keys = Object.keys(crimeData);
	const values = Object.values(crimeData);
	const key = keys[index].split(':')[1];
	const value = values[index];

	return (
		<CardContent>
			<Typography
				component="div"
				sx={{ mb: 1.5 }}
				color="text.secondary"
				variant="overline"
			>
				{year}년
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				범죄 유형별 건수
			</Typography>
			<Typography
				variant="h6"
				component="div"
				mt={2}
				sx={{ color: '#1976d2', textAlign: 'right' }}
			>
				{`${key} | ${value} 건`}
			</Typography>
		</CardContent>
	);
};
const CrimeTypeContent: React.FC<Props> = ({
	year,
	highestCrime,
	lowestCrime,
}) => {
	return (
		<CardContent>
			<Typography
				component="div"
				sx={{ mb: 1.5 }}
				color="text.secondary"
				variant="overline"
			>
				{year}년
			</Typography>
			<Grid container>
				<Grid item xs={5} md={5} sm={5}>
					<Typography
						component="div"
						sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
					>
						최다 범죄
					</Typography>
					<Box textAlign={'left'} mt={1}>
						<Typography
							component="div"
							variant="subtitle2"
							color="text.secondary"
						>
							{`${highestCrime?.crime}`}
						</Typography>
						<Typography
							component="div"
							variant="subtitle1"
							color="text.secondary"
						>
							{`${digit(highestCrime?.count)} 건`}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={2} md={2} sm={2}>
					<div></div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<div></div>
				</Grid>
				<Grid item xs={5} md={5} sm={5}>
					<Typography
						component="div"
						sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
					>
						최저 범죄
					</Typography>
					<Box textAlign={'left'} mt={1}>
						<Typography
							component="div"
							variant="subtitle2"
							color="text.secondary"
						>
							{`${lowestCrime?.crime}`}
						</Typography>
						<Typography
							component="div"
							variant="subtitle1"
							color="text.secondary"
						>
							{`${digit(lowestCrime?.count)} 건`}
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</CardContent>
	);
};
const PoliceOfficeContent: React.FC<Props> = ({ year, office }) => {
	if (!office) {
		return null;
	}
	return (
		<CardContent>
			<Typography
				component="div"
				sx={{ mb: 1.5 }}
				color="text.secondary"
				variant="overline"
			>
				{year}년
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				경찰서별 현황
			</Typography>
			<Typography
				variant="h6"
				component="div"
				sx={{ color: '#1976d2', textAlign: 'right' }}
			>
				{`${office?.경찰서}`}
			</Typography>
			<Stack direction="row" overflow={'auto'}>
				<Box sx={{ textAlign: 'center', minWidth: '95px' }}>
					<Typography variant="subtitle1" component="div">
						{`강도 ${digit(office?.강도)}`}
					</Typography>
				</Box>
				<Divider orientation="vertical" flexItem />
				<Box sx={{ textAlign: 'center', minWidth: '95px' }}>
					<Typography variant="subtitle1" component="div">
						{`살인 ${digit(office?.살인)}`}
					</Typography>
				</Box>
				<Divider orientation="vertical" flexItem />
				<Box sx={{ textAlign: 'center', minWidth: '95px' }}>
					<Typography variant="subtitle1" component="div">
						{`절도 ${digit(office?.절도)}`}
					</Typography>
				</Box>
				<Divider orientation="vertical" flexItem />
				<Box sx={{ textAlign: 'center', minWidth: '95px' }}>
					<Typography variant="subtitle1" component="div">
						{`폭력 ${digit(office?.폭력)}`}
					</Typography>
				</Box>
			</Stack>
		</CardContent>
	);
};

const CategoryCountContent: React.FC<Props> = ({
	year,
	crimeData,
	selectedCity,
}) => {
	if (!crimeData) return null;
	const index = 0;
	const keys = Object.keys(crimeData);
	const values = Object.values(crimeData);
	const idx = keys.findIndex(item => item === selectedCity);

	if (idx < 0) return null;
	const key = keys[idx];
	const value = values[idx];

	return (
		<CardContent>
			<Typography
				component="div"
				sx={{ mb: 1.5 }}
				color="text.secondary"
				variant="overline"
			>
				{year}년
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				지역별 범죄
			</Typography>
			<Typography
				variant="h6"
				component="div"
				mt={2}
				sx={{ color: '#1976d2', textAlign: 'right' }}
			>
				{`${key} | ${digit(value)} 건`}
			</Typography>
		</CardContent>
	);
};
const MaxMinYear: React.FC<Props> = ({
	selectedCity,
	highestYearData,
	lowestYearData,
}) => {
	if (!highestYearData || !lowestYearData) return null;
	const highestYear = Object.keys(highestYearData)[0];
	const lowestYear = Object.keys(lowestYearData)[0];

	const highestYearCount = digit(highestYearData[highestYear]);
	const lowestYearCount = digit(lowestYearData[lowestYear]);
	return (
		<CardContent>
			<Typography
				component="div"
				sx={{ mb: 1.5 }}
				color="text.secondary"
				variant="overline"
			>
				{selectedCity} 지역
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				최다 범죄 발생 연도
			</Typography>
			<Typography
				variant="h6"
				component="div"
				textAlign={'right'}
				ml={4}
				sx={{ color: '#1976d2', textAlign: 'right' }}
			>
				{highestYear} 년도 | {highestYearCount}건
			</Typography>
			<Typography
				mt={1}
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				최저 범죄 발생 연도
			</Typography>
			<Typography
				variant="h6"
				component="div"
				textAlign={'right'}
				ml={4}
				sx={{
					color: '#1976d2',
					textAlign: 'right',
				}}
			>
				{lowestYear} 년도 | {lowestYearCount}건
			</Typography>
		</CardContent>
	);
};

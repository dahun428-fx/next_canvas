import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

export type CardContentType =
	| 'total'
	| 'MaxMin'
	| 'crimeType'
	| 'figure'
	| 'police'
	| 'category';

type Props = {
	type?: CardContentType;
};

export const CustomCard: React.FC<Props> = ({ type }) => {
	const cardContent = () => {
		if (type === 'total') {
			return <TotalCriminalContent />;
		} else if (type === 'MaxMin') {
			return <MaxMinContent />;
		} else if (type === 'crimeType') {
			return <CrimeTypeContent />;
		} else if (type === 'figure') {
			return <FigureOutContent />;
		} else if (type === 'police') {
			return <PoliceOfficeContent />;
		} else if (type === 'category') {
			return <CategoryCountContent />;
		}
		return <div></div>;
	};
	return (
		<Box sx={{ minWidth: 150, margin: 1 }}>
			<Card sx={{ minHeight: 200 }} variant="outlined">
				{type && cardContent()}
			</Card>
		</Box>
	);
};

CustomCard.displayName = 'CustomCard';

const titleFontSize = 16;

const TotalCriminalContent: React.FC = () => {
	return (
		<CardContent>
			<Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
				2022년
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
					sx={{ color: '#1976d2', textAlign: 'right' }}
				>
					0000건
				</Typography>
			</Box>
		</CardContent>
	);
};
const MaxMinContent: React.FC = () => {
	return (
		<CardContent>
			<Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
				2022년
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				최다 범죄 발생지 :
				<Typography
					variant="h6"
					component="span"
					ml={1}
					sx={{ color: '#1976d2', textAlign: 'right' }}
				>
					경기도
				</Typography>
			</Typography>
			<Typography
				mt={1}
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				최저 범죄 발생지 :
				<Typography
					variant="h6"
					component="span"
					ml={1}
					sx={{ color: '#1976d2', textAlign: 'right' }}
				>
					경기도
				</Typography>
			</Typography>
		</CardContent>
	);
};

const FigureOutContent: React.FC = () => {
	return (
		<CardContent>
			<Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
				2022년
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				살인 건수
			</Typography>
			<Typography
				variant="h6"
				component="div"
				sx={{ color: '#1976d2', textAlign: 'right' }}
			>
				0000건
			</Typography>
		</CardContent>
	);
};
const CrimeTypeContent: React.FC = () => {
	return (
		<CardContent>
			<Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
				2022년
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				최다 범죄
			</Typography>
			<Typography variant="subtitle1" color="text.secondary">
				대분류 : 강도 / 중분류 : xxxx
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				최저 범죄
			</Typography>
			<Typography variant="subtitle1" color="text.secondary">
				대분류 : 강도 / 중분류 : xxxx
			</Typography>
		</CardContent>
	);
};
const PoliceOfficeContent: React.FC = () => {
	return (
		<CardContent>
			<Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
				2022년
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				가장 바쁜 경찰서 :
			</Typography>
			<Typography
				variant="h6"
				component="div"
				sx={{ color: '#1976d2', textAlign: 'right' }}
			>
				0000건
			</Typography>
		</CardContent>
	);
};

const CategoryCountContent: React.FC = () => {
	return (
		<CardContent>
			<Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
				2022년
			</Typography>
			<Typography
				component="div"
				sx={{ fontWeight: 'bold', fontSize: titleFontSize }}
			>
				xxxx 범죄 :
			</Typography>
			<Typography
				variant="h6"
				component="div"
				sx={{ color: '#1976d2', textAlign: 'right' }}
			>
				0000건
			</Typography>
		</CardContent>
	);
};

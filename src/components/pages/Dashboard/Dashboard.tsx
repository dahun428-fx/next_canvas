import { loadOperation } from '@/store/modules/common/police';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PoliceMain } from '../Police';
import { Container, Grid, Typography } from '@mui/material';
import { AppWidgetSummary } from '@/components/sections/overview/app-widget-summary';
import { BottomNavi } from '@/components/common/BottomNavi';

type Props = {};

export const Dashboard: React.FC<Props> = () => {
	return (
		<Container maxWidth="xl">
			<div>wellcome dashboard home</div>
		</Container>
	);
};

Dashboard.displayName = 'Dashboard';

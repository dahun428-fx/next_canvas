import { loadOperation } from '@/store/modules/common/police';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PoliceMain } from '../Police';
import { Container, Grid, Typography } from '@mui/material';
import { AppWidgetSummary } from '@/components/sections/overview/app-widget-summary';
import { BottomNavi } from '@/components/common/BottomNavi';

type Props = {};

export const Dashboard: React.FC<Props> = () => {
	const initailized = useRef(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!initailized.current) {
			loadOperation(dispatch)();
			initailized.current = true;
		}
	}, [dispatch, initailized.current]);

	return (
		<Container maxWidth="xl">
			<PoliceMain />
			<BottomNavi />
		</Container>
	);
};

Dashboard.displayName = 'Dashboard';

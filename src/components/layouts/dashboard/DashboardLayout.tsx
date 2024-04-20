import { ReactNode, useEffect, useState } from 'react';
import { Nav } from './common/Nav';
import { Header } from './common/Header';
import { Box } from '@mui/material';
import { Main } from './common/Main';
import { BottomAppBar } from '@/components/common/BottomAppBar';
import { useDispatch } from 'react-redux';
import { Router } from 'next/router';
import { bottomBarResetChartTypesOperation } from '@/store/modules/common/bottom';

type Props = {
	children?: ReactNode;
};

export const DashboardLayout: React.FC<Props> = ({ children }) => {
	const [openNav, setOpenNav] = useState(true);

	const dispatch = useDispatch();
	useEffect(() => {
		Router.events.on(
			'routeChangeStart',
			bottomBarResetChartTypesOperation(dispatch)
		);
		return () =>
			Router.events.off(
				'routeChangeStart',
				bottomBarResetChartTypesOperation(dispatch)
			);
	}, [dispatch]);

	return (
		<>
			<Header onOpenNav={() => setOpenNav(true)} />

			<Box
				sx={{
					minHeight: 1,
					display: 'flex',
					flexDirection: { xs: 'column', lg: 'row' },
				}}
			>
				<Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

				<Main>{children}</Main>
				<BottomAppBar />
			</Box>
		</>
	);
};

DashboardLayout.displayName = 'DashboardLayout';

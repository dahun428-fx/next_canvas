import { ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { Nav } from './common/Nav';
import { Header } from './common/Header';
import { Box } from '@mui/material';
import { Main } from './common/Main';
import { BottomAppBar } from '@/components/common/BottomAppBar';
import { useDispatch } from 'react-redux';
import { Router } from 'next/router';
import {
	bottomBarResetChartTypesOperation,
	selectBottomPageRoute,
} from '@/store/modules/common/bottom';
import { useSelector } from '@/store/hooks';
import Loading from './common/Loading';
import {
	loadOperations as RegionLoadOperation,
	selectRegion,
} from '@/store/modules/common/region';
import {
	loadOperations as violenceLoadOperation,
	selectViolence,
} from '@/store/modules/common/violence';
import { GetStaticProps } from 'next';
import {
	RegionResourceYear,
	searchRegionList,
} from '@/api/clients/services/open/region';
import { Layout } from '../dashboard-ver2/MainLayout/MainLayout';
type Props = {
	children?: ReactNode;
};

export const DashboardLayout: React.FC<Props> = ({ children }) => {
	const [open, setOpen] = useState(true);

	const dispatch = useDispatch();

	const pageRoute = useSelector(selectBottomPageRoute);

	useEffect(() => {
		if (pageRoute) {
			return;
		}

		Router.events.on(
			'routeChangeStart',
			bottomBarResetChartTypesOperation(dispatch)
		);
		return () =>
			Router.events.off(
				'routeChangeStart',
				bottomBarResetChartTypesOperation(dispatch)
			);
	}, [dispatch, pageRoute]);

	return (
		<>
			<Header />
			<Box
				sx={{
					minHeight: 1,
					display: 'flex',
					flexDirection: { xs: 'column', lg: 'row' },
				}}
			>
				<Nav open={open} setOpen={(value: boolean) => setOpen(value)} />
				{/* <Layout /> */}
				<Suspense fallback={<Loading />}>
					<Main open={open}>{children}</Main>
				</Suspense>
				<BottomAppBar />
			</Box>
		</>
	);
};

DashboardLayout.displayName = 'DashboardLayout';

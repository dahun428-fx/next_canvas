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
	defaultPageNumber,
	defaultPerPage,
	searchRegionList,
} from '@/api/clients/services/open/region';
type Props = {
	children?: ReactNode;
};

export const DashboardLayout: React.FC<Props> = ({ children }) => {
	const [open, setOpen] = useState(true);

	const initialize = useRef(false);
	const regionResponse = useSelector(selectRegion);
	const violenceResponse = useSelector(selectViolence);

	const dispatch = useDispatch();

	const pageRoute = useSelector(selectBottomPageRoute);
	// useEffect(() => {
	// 	if (!initialize.current) {
	// 		if (regionResponse.items.length < 1) {
	// 			RegionLoadOperation(dispatch)();
	// 		}
	// 		if (violenceResponse.items.length < 1) {
	// 			violenceLoadOperation(dispatch)();
	// 		}
	// 		initialize.current = true;
	// 	}
	// }, [
	// 	dispatch,
	// 	regionResponse.items.length,
	// 	violenceResponse.items.length,
	// 	initialize.current,
	// ]);

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
				<Suspense fallback={<Loading />}>
					<Main open={open}>{children}</Main>
				</Suspense>
				<BottomAppBar />
			</Box>
		</>
	);
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	console.log('start---->');
	const promise = await Promise.allSettled(
		RegionResourceYear.map(async item => {
			const year = item;
			const page = defaultPageNumber; //default
			const perPage = defaultPerPage; //default
			const response = await searchRegionList({
				page,
				perPage,
				year: year,
			});
			return { response, year: year };
		})
	);

	// promise.then(async response => {
	// 	const regionItems: RegionResponse[] = response.map((item, index) => {
	// 		// const result = changeToRegionalData(item.response.data, item.year);
	// 		// console.log('response result ====> ', result);
	// 		return {
	// 			currentCount: item.response.currentCount,
	// 			matchCount: item.response.matchCount,
	// 			page: item.response.page,
	// 			perPage: item.response.perPage,
	// 			totalCount: item.response.totalCount,
	// 			items: changeToRegionalData(item.response.data, item.year),
	// 			year: item.year,
	// 		};
	// 	});
	// })

	console.log('promise ===> ', promise);

	return {
		props: {},
		// revalidate: 1800,
	};
};

DashboardLayout.displayName = 'DashboardLayout';

import {
	RegionResourceYear,
	regionRequestPageNumber,
	regionRequestPerPage,
	searchRegionList,
} from '@/api/clients/services/open/region';
// import { CrimeRegionPage } from '@/components/pages/CrimeRegionPage';
import { SearchRegionResponse } from '@/models/api/open/region/SearchRegionResponse';
import {
	RegionResponse,
	loadOperations,
	selectRegionItems,
} from '@/store/modules/common/region';
import { changeToRegionalData } from '@/utils/openapi/region/region';
import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// type Props = { regionItems: RegionResponse[]; initialYear: string };
type Props = {};

const CrimeRegionPage = dynamic<Props>(
	() =>
		import('@/components/pages/CrimeRegionPage').then(
			module => module.CrimeRegionPage
		),
	{
		ssr: false,
	}
);

// const CrimeRegion: NextPage<Props> = ({ initialYear, regionItems }) => {
// 	return <CrimeRegionPage {...{ regionItems, initialYear }} />;
// };
const CrimeRegion: NextPage<Props> = () => {
	console.log('CrimeRegion');
	const dispatch = useDispatch();
	const regionResponse = useSelector(selectRegionItems);

	const resourceYears = useMemo(() => {
		const years = [...RegionResourceYear];

		const addYears = years.reduce<string[]>((prev, curr) => {
			if (!regionResponse.some(item => item.year === curr)) {
				return [...prev, curr];
			} else {
				return prev;
			}
		}, []);

		return addYears;
	}, [regionResponse]);

	useEffect(() => {
		console.log('resourceYears', resourceYears);
		loadOperations(dispatch)(resourceYears);
	}, [regionResponse, resourceYears]);

	return <CrimeRegionPage />;
};

// export const getStaticProps: GetStaticProps<Props> = async () => {
// 	try {
// 		const firstInitialYear = RegionResourceYear[RegionResourceYear.length - 1];

// 		const promise = await Promise.allSettled(
// 			RegionResourceYear.map(async item => {
// 				const year = item;
// 				const page = regionRequestPageNumber;
// 				const perPage = regionRequestPerPage;
// 				const response = await searchRegionList({
// 					page,
// 					perPage,
// 					year,
// 				});
// 				response.year = year;
// 				return response;
// 			})
// 		);
// 		const fulfilledRegionPromise = promise.map(item => {
// 			if (item.status === 'fulfilled') {
// 				return item;
// 			}
// 		}) as PromiseFulfilledResult<SearchRegionResponse>[];

// 		const regionItems: RegionResponse[] = fulfilledRegionPromise.map(item => {
// 			const response = item.value;
// 			const year = response.year ?? firstInitialYear;
// 			return {
// 				currentCount: response.currentCount,
// 				matchCount: response.matchCount,
// 				page: response.page,
// 				perPage: response.perPage,
// 				totalCount: response.totalCount,
// 				items: changeToRegionalData(response.data, year),
// 				year: response.year,
// 			};
// 		});

// 		return {
// 			props: { regionItems, initialYear: firstInitialYear },
// 		};
// 	} catch (error) {
// 		console.log('region static props error -->', error);
// 	}

// 	return {
// 		notFound: true,
// 	};
// };

export default CrimeRegion;

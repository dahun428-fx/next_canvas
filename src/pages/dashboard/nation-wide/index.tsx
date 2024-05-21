import {
	PoliceRequestPageNumberDefault,
	PoliceRequestPerPageDefault,
	PoliceResourceYears,
	searchPoliceList,
} from '@/api/clients/services/open/police';
import {
	RegionResourceYear,
	defaultPageNumber,
	defaultPerPage,
	searchRegionList,
} from '@/api/clients/services/open/region';
import { LoadingBar } from '@/components/common/Loading/LoadingBar';
// import { NationWidePage } from '@/components/pages/NationWidePage';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { SearchRegionResponse } from '@/models/api/open/region/SearchRegionResponse';
import { RegionResponse } from '@/store/modules/common/region';
import {
	PoliceYearType,
	police_total_data_by_year,
} from '@/utils/openapi/police/data';
import { changeToRegionalData } from '@/utils/openapi/region/region';
import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

type Props = {
	regionItems: RegionResponse[];
	violenceItems: SearchPoliceReseponse[];
	policeYearlyData: PoliceYearType[];
};

const NationWidePage = dynamic<Props>(
	() =>
		import('@/components/pages/NationWidePage').then(
			module => module.NationWidePage
		),
	{ ssr: false, loading: () => <LoadingBar /> }
);

const NationWide: NextPage<Props> = ({
	regionItems,
	violenceItems,
	policeYearlyData,
}) => {
	return (
		<NationWidePage
			policeYearlyData={policeYearlyData}
			regionItems={regionItems}
			violenceItems={violenceItems}
		/>
	);
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	try {
		const [regionPromise, policePromise] = await Promise.all([
			await Promise.allSettled(
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
			),
			await Promise.allSettled(
				PoliceResourceYears.map(async item => {
					const year = item;
					const page = PoliceRequestPageNumberDefault;
					const perPage = PoliceRequestPerPageDefault;
					const response = await searchPoliceList({
						page,
						perPage,
						year: year,
					});
					return response;
				})
			),
		]);

		const fulfilledRegionPromise = regionPromise.map(item => {
			if (item.status === 'fulfilled') {
				return item;
			}
		}) as PromiseFulfilledResult<{
			response: SearchRegionResponse;
			year: string;
		}>[];

		const fulfiiledPolicePromise = policePromise.map(item => {
			if (item.status === 'fulfilled') {
				return item;
			}
		}) as PromiseFulfilledResult<SearchPoliceReseponse>[];

		const regionItems: RegionResponse[] = fulfilledRegionPromise.map(item => {
			const { response, year } = item.value;
			return {
				currentCount: response.currentCount,
				matchCount: response.matchCount,
				page: response.page,
				perPage: response.perPage,
				totalCount: response.totalCount,
				items: changeToRegionalData(response.data, year),
				year: year,
			};
		});
		const violenceItems: SearchPoliceReseponse[] = fulfiiledPolicePromise.map(
			item => {
				return {
					...item.value,
					year: `${item.value.data[0].발생년도 ?? item.value.data[0].발생연도}`,
				};
			}
		);

		const policeYearlyData = police_total_data_by_year(violenceItems);

		return {
			props: {
				regionItems,
				violenceItems,
				policeYearlyData,
			},
			revalidate: 1800,
		};
	} catch (error) {
		console.log('nation-wide static props error -->', error);
	}

	return {
		notFound: true,
	};
};

export default NationWide;

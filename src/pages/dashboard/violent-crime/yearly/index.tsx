import {
	PoliceRequestPageNumberDefault,
	PoliceRequestPerPageDefault,
	searchPoliceList,
} from '@/api/clients/services/open/police';
import { RegionResourceYear } from '@/api/clients/services/open/region';
import { LoadingBar } from '@/components/common/Loading/LoadingBar';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

type Props = {
	initialYear: string;
	violenceItems: SearchPoliceReseponse[];
};

const ViolentYearlyPage = dynamic<Props>(
	() =>
		import('@/components/pages/ViolentYearlyPage').then(
			module => module.ViolentYearlyPage
		),
	{
		ssr: false,
		loading: () => <LoadingBar />,
	}
);

const ViolentCrimeYealy: NextPage<Props> = ({ initialYear, violenceItems }) => {
	return (
		<ViolentYearlyPage
			initialYear={initialYear}
			violenceItems={violenceItems}
		/>
	);
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	//최신 데이터 2022 년도 것만 불러옴
	try {
		const firstInitialYear = RegionResourceYear[RegionResourceYear.length - 1];

		const promise = await Promise.allSettled(
			// [firstInitialYear].map(async item => {
			RegionResourceYear.map(async item => {
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
		);

		const fulfiiledPolicePromise = promise.map(item => {
			if (item.status === 'fulfilled') {
				return item;
			}
		}) as PromiseFulfilledResult<SearchPoliceReseponse>[];

		const violenceItems: SearchPoliceReseponse[] = fulfiiledPolicePromise.map(
			item => {
				return {
					...item.value,
					year: `${item.value.data[0].발생년도 ?? item.value.data[0].발생연도}`,
				};
			}
		);

		return {
			props: {
				violenceItems,
				initialYear: firstInitialYear,
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

export default ViolentCrimeYealy;

import {
	RegionResourceYear,
	defaultPageNumber,
	defaultPerPage,
	searchRegionList,
} from '@/api/clients/services/open/region';
import { NationWidePage } from '@/components/pages/NationWidePage';
import { SearchRegionResponse } from '@/models/api/open/region/SearchRegionResponse';
import { RegionResponse } from '@/store/modules/common/region';
import { changeToRegionalData } from '@/utils/openapi/region/region';
import { GetStaticProps, NextPage } from 'next';

type Props = {
	regionItems: RegionResponse[];
};

const NationWide: NextPage<Props> = ({ regionItems }) => {
	console.log('from getstatic props ===> ', regionItems);
	return <NationWidePage />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	type SettledType = {
		response: SearchRegionResponse;
		year: string;
	};

	try {
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

		const fulfilledPromise = promise.map(item => {
			if (item.status === 'fulfilled') {
				return item;
			}
		}) as PromiseFulfilledResult<SettledType>[];

		const regionItems: RegionResponse[] = fulfilledPromise.map(item => {
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

		return {
			props: {
				regionItems,
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

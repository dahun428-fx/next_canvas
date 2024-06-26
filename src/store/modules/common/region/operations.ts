import {
	RegionResourceYear,
	searchRegionList,
} from '@/api/clients/services/open/region';
import { SearchRegionResponse } from '@/models/api/open/region/SearchRegionResponse';
import { Dispatch } from 'redux';
import { RegionResponse, actions } from './slice';
import { changeToRegionalData } from '@/utils/openapi/region/region';
import { ChartType } from 'chart.js';
import { InitializeRegionRequest } from '@/models/api/open/region/SearchRegionRequest';

// export function loadOperations(dispatch: Dispatch) {
// 	return async () => {
// 		const page = 1;
// 		const perPage = 50;
// 		const promise = Promise.all(
// 			RegionResourceYear.map(async item => {
// 				const year = item;
// 				const response = await searchRegionList({
// 					page,
// 					perPage,
// 					year: year,
// 				});
// 				return { response, year: year };
// 			})
// 		);
// 		promise.then(async response => {
// 			const regionItems: RegionResponse[] = response.map((item, index) => {
// 				// const result = changeToRegionalData(item.response.data, item.year);
// 				// console.log('response result ====> ', result);
// 				return {
// 					currentCount: item.response.currentCount,
// 					matchCount: item.response.matchCount,
// 					page: item.response.page,
// 					perPage: item.response.perPage,
// 					totalCount: item.response.totalCount,
// 					items: changeToRegionalData(item.response.data, item.year),
// 					year: item.year,
// 				};
// 			});
// 			dispatch(actions.load(regionItems));
// 		});
// 	};
// }
export function loadOperations(dispatch: Dispatch) {
	return async (yearData: string | string[]) => {
		const years: string[] =
			typeof yearData === 'string' ? [yearData] : [...yearData];

		const promise = await Promise.allSettled(
			years.map(async nowYear => {
				const response = await searchRegionList({
					...InitializeRegionRequest,
					year: nowYear,
				});

				response.year = nowYear;
				return response;
			})
		);

		const fulfilledRegionPromise = promise.map(item => {
			if (item.status === 'fulfilled') {
				return item;
			}
		}) as PromiseFulfilledResult<SearchRegionResponse>[];

		const regionItems: RegionResponse[] = fulfilledRegionPromise.map(item => {
			const response = item.value;
			const year = response.year ?? years[0];
			return {
				currentCount: response.currentCount,
				matchCount: response.matchCount,
				page: response.page,
				perPage: response.perPage,
				totalCount: response.totalCount,
				items: changeToRegionalData(response.data, year),
				year: response.year,
			};
		});
		dispatch(actions.load(regionItems));
	};
}

export function setOperations(dispatch: Dispatch) {
	return (regionItems: RegionResponse[]) => {
		dispatch(actions.load(regionItems));
	};
}

export function updateChartTypeOperation(dispatch: Dispatch) {
	return (chartType: ChartType) => {
		dispatch(actions.updateChartType(chartType));
	};
}

export function updateYearOperation(dispatch: Dispatch) {
	return (year: string) => {
		dispatch(actions.updateYear(year));
	};
}

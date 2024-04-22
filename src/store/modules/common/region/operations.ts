import {
	RegionResourceYear,
	searchRegionList,
} from '@/api/clients/services/open/region';
import { SearchRegionResponse } from '@/models/api/open/region/SearchRegionResponse';
import { Dispatch } from 'redux';
import { RegionResponse, actions } from './slice';
import {
	changeToRegionalData,
	responseToRegionData,
} from '@/utils/openapi/region/region';
import { ChartType } from 'chart.js';

export function loadOperations(dispatch: Dispatch) {
	return async () => {
		const page = 1;
		const perPage = 50;
		const promise = Promise.all(
			RegionResourceYear.map(async item => {
				const year = item;
				const response = await searchRegionList({
					page,
					perPage,
					year: year,
				});
				return { response, year: year };
			})
		);
		promise.then(async response => {
			const regionItems: RegionResponse[] = response.map((item, index) => {
				if (index === 0) {
					const result = changeToRegionalData(item.response.data, item.year);
					console.log('response result ====> ', result);
				}
				return {
					currentCount: item.response.currentCount,
					matchCount: item.response.matchCount,
					page: item.response.page,
					perPage: item.response.perPage,
					totalCount: item.response.totalCount,
					items: responseToRegionData(item.response.data),
					year: item.year,
				};
			});
			dispatch(actions.load(regionItems));
		});
	};
}

export function updateChartTypeOperation(dispatch: Dispatch) {
	return (chartType: ChartType) => {
		dispatch(actions.updateChartType(chartType));
	};
}

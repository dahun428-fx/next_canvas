import {
	PoliceResourceYears,
	searchPoliceList,
} from '@/api/clients/services/open/police';
import { Dispatch } from 'redux';
import { actions } from './slice';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { ChartType } from 'chart.js';
import {
	InitializePoliceRequest,
	SearchPoliceRequest,
} from '@/models/api/open/police/SearchPoliceRequest';

// export function loadOperations(dispatch: Dispatch) {
// 	return async () => {
// 		const page = 1;
// 		const perPage = 300;
// 		const promise = Promise.all(
// 			PoliceResourceYears.map(async item => {
// 				const year = item;
// 				const response = await searchPoliceList({ page, perPage, year: year });
// 				return response;
// 			})
// 		);
// 		promise.then(async (response: SearchPoliceReseponse[]) => {
// 			const violenceItems = response.map(
// 				(item: SearchPoliceReseponse, index) => {
// 					return {
// 						...item,
// 						year: `${item.data[0].발생년도}`,
// 					};
// 				}
// 			);
// 			dispatch(actions.load(violenceItems));
// 		});
// 	};
// }

export function loadOperations(dispatch: Dispatch) {
	return async (nowYear: string) => {
		const promise = searchPoliceList({
			...InitializePoliceRequest,
			year: nowYear,
		});
		promise.then(response => {
			const items: SearchPoliceReseponse = {
				...response,
				year: response.year ?? nowYear,
			};
			dispatch(actions.load([items]));
		});
	};
}

export function setOperations(dispatch: Dispatch) {
	return (violenceItems: SearchPoliceReseponse[]) => {
		dispatch(actions.load(violenceItems));
	};
}

export function updateChartTypeOperation(dispatch: Dispatch) {
	return (chartType: ChartType) => {
		dispatch(actions.updateChartType(chartType));
	};
}

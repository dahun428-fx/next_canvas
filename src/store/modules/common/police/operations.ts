import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import { actions as PoliceActions, actions } from '.';
import { Dispatch } from 'redux';
import {
	PoliceRequestPageNumberDefault,
	PoliceRequestPerPageDefault,
	PoliceResourceYears,
	searchPoliceList,
} from '@/api/clients/services/open/police';
import {
	InitializePoliceRequest,
	SearchPoliceRequest,
} from '@/models/api/open/police/SearchPoliceRequest';
import { ChartType } from 'chart.js';
import { PoliceYearRange } from '@/utils/openapi/police/data';

type PoliceRequest = Omit<SearchPoliceRequest, 'serviceKey'>;

export function loadOperation(dispatch: Dispatch) {
	return async () => {
		const policeRequest: PoliceRequest = InitializePoliceRequest;

		await searchPoliceList(policeRequest).then(response => {
			dispatch(actions.load({ ...response, year: policeRequest.year }));
		});
	};
}

export function fetchDataOperation(dispatch: Dispatch) {
	return async (year: PoliceYearRange) => {
		const request: PoliceRequest = {
			page: PoliceRequestPageNumberDefault,
			perPage: PoliceRequestPerPageDefault,
			year: year,
		};
		await searchPoliceList(request).then(response => {
			dispatch(actions.load({ ...response, year: request.year }));
		});
	};
}

export const addItemsOperations = (dispatch: Dispatch) => {
	return (items: Police[]) => {
		dispatch(PoliceActions.setItems(items));
	};
};

export const updateItemsOperations = (dispatch: Dispatch) => {
	return (items: Police[]) => {
		dispatch(PoliceActions.updateItems(items));
	};
};

export const updateChartTypeOperation = (dispatch: Dispatch) => {
	return (item: ChartType) => {
		dispatch(PoliceActions.updateChartType(item));
	};
};

function noop() {
	//noop
}

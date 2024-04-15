import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import { actions as PoliceActions, actions } from '.';
import { Dispatch } from 'redux';
import { searchPoliceList } from '@/api/clients/services/open/police';
import {
	InitializePoliceRequest,
	SearchPoliceRequest,
} from '@/models/api/open/police/SearchPoliceRequest';

type PoliceRequest = Omit<SearchPoliceRequest, 'serviceKey'>;

export function loadOperation(dispatch: Dispatch) {
	return async () => {
		const policeRequest: PoliceRequest = InitializePoliceRequest;

		await searchPoliceList(policeRequest).then(response => {
			dispatch(actions.load({ ...response, year: policeRequest.year }));
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

function noop() {
	//noop
}

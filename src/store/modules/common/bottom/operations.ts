import { Dispatch } from 'redux';
import { actions as BottomActions, PageRouteState, actions } from '.';
import { ChartType } from 'chart.js';

// export const bottomBarOpenOperation = (dispatch: Dispatch) => {
// 	return () => {
// 		dispatch(BottomActions.show());
// 	};
// };

// export const bottomBarHideOperation = (dispatch: Dispatch) => {
// 	return () => {
// 		dispatch(BottomActions.hide());
// 	};
// };
export const bottomBarUpdatePageRouteOperation = (dispatch: Dispatch) => {
	return (item: PageRouteState) => {
		dispatch(BottomActions.updatePageRoute(item));
	};
};

export const bottomBarShowOpertion = (dispatch: Dispatch) => {
	return (show: boolean) => {
		show ? dispatch(BottomActions.show()) : dispatch(BottomActions.hide());
	};
};

export const bottomBarAddChartTypesOpertion = (dispatch: Dispatch) => {
	return (items: ChartType[]) => {
		dispatch(BottomActions.setChatTypes(items));
	};
};

export const bottomBarResetChartTypesOperation = (dispatch: Dispatch) => {
	return () => {
		dispatch(BottomActions.resetChartTypes());
	};
};

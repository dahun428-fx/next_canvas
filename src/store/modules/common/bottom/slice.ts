import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChartType } from 'chart.js';

export type PageRouteState = '' | 'police' | 'violent' | 'region';

export type BottomBarState = {
	show: boolean;
	NowPageRoute?: PageRouteState;
	chartTypes?: ChartType[];
};

const initialState: BottomBarState = {
	show: true,
	NowPageRoute: '',
	chartTypes: [],
};

const slice = createSlice({
	name: 'bottomBar',
	initialState,
	reducers: {
		setChatTypes(state, action: PayloadAction<ChartType[]>) {
			return {
				...state,
				chartTypes: action.payload,
			};
		},
		resetChartTypes(state) {
			return {
				...state,
				chartTypes: [],
			};
		},
		updatePageRoute(state, action: PayloadAction<PageRouteState>) {
			return {
				...state,
				NowPageRoute: action.payload,
			};
		},
		show(state) {
			return { ...state, show: true };
		},
		hide(state) {
			return { ...state, show: false };
		},
	},
});

export const { reducer: bottomBarReducer, actions } = slice;

import { RegionItem } from '@/utils/openapi/region/region';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChartType } from 'chart.js';

export type RegionState = {
	items: RegionResponse[];
	show: boolean;
	chartType: ChartType;
};

export type RegionResponse = {
	currentCount: number;
	items: RegionItem[];
	totalCount: number;
	matchCount: number;
	page: number;
	perPage: number;
	year?: string;
};

const initialState: RegionState = {
	items: [],
	chartType: 'doughnut',
	show: true,
};

const slice = createSlice({
	name: 'region',
	initialState,
	reducers: {
		load(state, action: PayloadAction<RegionResponse[]>) {
			return {
				...state,
				items: action.payload,
			};
		},
		updateChartType(state, action: PayloadAction<ChartType>) {
			return {
				...state,
				chartType: action.payload,
			};
		},
	},
});
export const { reducer: regionReducer, actions } = slice;

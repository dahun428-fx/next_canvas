import { RegionItem } from '@/utils/openapi/region/region';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChartType } from 'chart.js';

export type RegionState = {
	items: RegionResponse[];
	show: boolean;
	year: string;
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
	year: '2022',
	show: true,
};

const slice = createSlice({
	name: 'region',
	initialState,
	reducers: {
		load(state, action: PayloadAction<RegionResponse[]>) {
			if (state.items.some(item => item.year === action.payload[0].year)) {
				return {
					...state,
				};
			}
			return {
				...state,
				items: [...state.items, ...action.payload],
			};
		},
		updateChartType(state, action: PayloadAction<ChartType>) {
			return {
				...state,
				chartType: action.payload,
			};
		},
		updateYear(state, action: PayloadAction<string>) {
			return {
				...state,
				year: action.payload,
			};
		},
	},
});
export const { reducer: regionReducer, actions } = slice;

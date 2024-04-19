import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChartType } from 'chart.js';

export type PoliceState = {
	items: Police[];
	show: boolean;
	page?: number;
	perPage?: number;
	totalCount?: number;
	matchCount?: number;
	currentCount?: number;
	year?: string;
	chartType: ChartType;
};

const initialState: PoliceState = {
	items: [],
	chartType: 'doughnut',
	show: true,
};

type LoadPayload = {
	currentCount: number;
	data: Police[];
	totalCount: number;
	matchCount: number;
	page: number;
	perPage: number;
	year?: string;
	chartType?: ChartType;
};

const slice = createSlice({
	name: 'police',
	initialState,
	reducers: {
		load(state, action: PayloadAction<LoadPayload>) {
			const {
				currentCount,
				data,
				matchCount,
				page,
				perPage,
				totalCount,
				year,
			} = action.payload;

			return {
				...state,
				items: data,
				currentCount,
				matchCount,
				page,
				perPage,
				totalCount,
				year,
			};
		},
		setItems(state, action: PayloadAction<Police[]>) {
			return {
				...state,
				items: [...action.payload],
			};
		},
		updateItems(state, action: PayloadAction<Police[]>) {
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
		// removeItems() {},
		show(state) {
			return { ...state, show: true };
		},
		hide(state) {
			return { ...state, show: false };
		},
	},
});

export const { reducer: policeReducer, actions } = slice;

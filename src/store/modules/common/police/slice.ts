import { MyChartType } from '@/components/ui/charts/types';
import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type PoliceState = {
	items: Police[];
	show: boolean;
	page?: number;
	perPage?: number;
	totalCount?: number;
	matchCount?: number;
	currentCount?: number;
	year?: string;
	chartType?: PoliceChartType;
};

type PoliceChartType = MyChartType;

const initialState: PoliceState = {
	items: [],
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
	chartType?: PoliceChartType;
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
				chartType,
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
				chartType: chartType ?? 'doughnut',
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

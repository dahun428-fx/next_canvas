import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChartType } from "chart.js";

export type ViolenceState = {
  items: LoadPayload[];
  chartType: ChartType;
  show: boolean;
};

export interface Violence {
  data: ViolenceItem[];
  page?: number;
  perPage?: number;
  totalCount?: number;
  matchCount?: number;
  currentCount?: number;
  year?: string;
}

export interface ViolenceItem {
  강도: number;
  경찰서: string;
  발생년도: number;
  발생연도?: number;
  살인: number;
  절도: number;
  폭력: number;
}

type LoadPayload = {
  currentCount: number;
  data: ViolenceItem[];
  totalCount: number;
  matchCount: number;
  page: number;
  perPage: number;
  year?: string;
};

const initialState: ViolenceState = {
  items: [],
  chartType: "line",
  show: true,
};

const slice = createSlice({
  name: "violence",
  initialState,
  reducers: {
    load(state, action: PayloadAction<LoadPayload[]>) {
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

export const { reducer: violenceReducer, actions } = slice;

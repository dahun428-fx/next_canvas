import { AppState } from '@/store';

export function selectRegion(state: AppState) {
	return state.region;
}

export function selectChartType(state: AppState) {
	return state.region.chartType;
}
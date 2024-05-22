import { AppState } from '@/store';

export function selectRegion(state: AppState) {
	return state.region;
}

export function selectRegionItems(state: AppState) {
	return state.region.items;
}

export function selectChartType(state: AppState) {
	return state.region.chartType;
}

export function selectYear(state: AppState) {
	return state.region.year;
}

import { AppState } from '@/store';

export function selectPolice(state: AppState) {
	return state.police;
}

export function selectPoliceChartType(state: AppState) {
	return state.police.chartType;
}

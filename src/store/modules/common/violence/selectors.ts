import { AppState } from '@/store';

export function selectViolence(state: AppState) {
	return state.violence;
}

export function selectChartType(state: AppState) {
	return state.violence.chartType;
}

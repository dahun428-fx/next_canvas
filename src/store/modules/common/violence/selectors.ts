import { AppState } from '@/store';

export function selectViolence(state: AppState) {
	return state.violence;
}

export function selectViolenceItems(state: AppState) {
	return state.violence.items;
}

export function selectChartType(state: AppState) {
	return state.violence.chartType;
}

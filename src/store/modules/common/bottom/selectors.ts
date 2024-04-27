import { AppState } from '@/store';

export const selectBottomShowState = (state: AppState) => {
	return state.bottomBar.show;
};

export const selectBottomChartTypes = (state: AppState) => {
	return state.bottomBar.chartTypes;
};

export const selectBottomPageRoute = (state: AppState) => {
	return state.bottomBar.NowPageRoute;
};

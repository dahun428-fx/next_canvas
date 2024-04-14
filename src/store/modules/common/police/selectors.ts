import { AppState } from '@/store';

export function selectPolice(state: AppState) {
	return state.police;
}

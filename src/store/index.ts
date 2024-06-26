import { configureStore } from '@reduxjs/toolkit';
import { policeReducer } from './modules/common/police/slice';
import { violenceReducer } from './modules/common/violence/slice';
import { bottomBarReducer } from './modules/common/bottom/slice';
import { regionReducer } from './modules/common/region';

export const store = configureStore({
	reducer: {
		police: policeReducer,
		violence: violenceReducer,
		region: regionReducer,
		bottomBar: bottomBarReducer,
	},
	devTools: process.env.NODE_ENV === 'development',
});

export type GetState = typeof store.getState;
export type AppState = ReturnType<GetState>;
export type AppStore = typeof store;

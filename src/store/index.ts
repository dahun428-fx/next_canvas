import { configureStore } from '@reduxjs/toolkit';
import { policeReducer } from './modules/common/police/slice';

export const store = configureStore({
	reducer: {
		police: policeReducer,
	},
	devTools: process.env.NODE_ENV === 'development',
});

export type GetState = typeof store.getState;
export type AppState = ReturnType<GetState>;
export type AppStore = typeof store;

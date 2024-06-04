import { Provider } from 'react-redux';
import { store } from '@/store';
import { AppPropsWithLayout } from '../types/types';
import { Standard } from '@/layouts/standard';
import { useEffect } from 'react';
import { Router } from 'next/router';
import { bottomBarResetChartTypesOperation } from '@/store/modules/common/bottom';
import { useDispatch } from 'react-redux';
import '@/styles/common.css';
import { ThemeProvider } from '@mui/material';
import theme from '../themes/index';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Standard;

	return (
		<Provider store={store}>
			{/* <ThemeProvider theme={theme}> */}
			{getLayout(<Component {...pageProps} />)}
			{/* </ThemeProvider> */}
		</Provider>
	);
}

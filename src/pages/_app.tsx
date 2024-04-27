import { Provider } from 'react-redux';
import { store } from '@/store';
import { AppPropsWithLayout } from './types';
import { Standard } from '@/layouts/standard';
import { useEffect } from 'react';
import { Router } from 'next/router';
import { bottomBarResetChartTypesOperation } from '@/store/modules/common/bottom';
import { useDispatch } from 'react-redux';
import '@/styles/common.css';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Standard;

	return (
		<Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
	);
}

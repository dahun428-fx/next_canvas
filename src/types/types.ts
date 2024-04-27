import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type GetLayout = (page: ReactElement) => ReactNode;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: GetLayout;
};

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

import dynamic from 'next/dynamic';
import { GetLayout } from '@/pages/types';
import { DashboardLayout } from '@/components/layouts/dashboard';

// eslint-disable-next-line @typescript-eslint/ban-types
// const Layout = dynamic<{}>(
// 	() =>
// 		import('@/components/layouts/dashboard').then(
// 			({ DashboardLayout }) => DashboardLayout
// 		),
// 	{ ssr: false }
// );

export const Standard: GetLayout = page => {
	return <DashboardLayout>{page}</DashboardLayout>;
};

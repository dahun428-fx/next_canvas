import dynamic from 'next/dynamic';
import { GetLayout } from '@/types/types';
import { DashboardLayout } from '@/components/layouts/dashboard';

export const Standard: GetLayout = page => {
	return <DashboardLayout>{page}</DashboardLayout>;
};

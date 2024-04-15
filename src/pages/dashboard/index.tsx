import { Dashboard } from '@/components/pages/Dashboard';
import { PoliceMain } from '@/components/pages/Police';
import { GetServerSideProps, NextPage } from 'next';

type Props = {};
const DashboardPage: NextPage<Props> = ({}) => {
	return (
		<div>
			<Dashboard />
		</div>
	);
};

export default DashboardPage;

import { Dashboard } from '@/components/pages/Dashboard';
import { PoliceMain } from '@/components/pages/Police';
import { GetServerSideProps, NextPage } from 'next';

type Props = {};
const DashboardPage: NextPage<Props> = ({}) => {
	return (
		<div>
			hello this is DashboardPage
			{/* <Dashboard /> */}
		</div>
	);
};

// export const getServerSideProps: GetServerSideProps<Props> = async ({
// 	res,
// 	req,
// 	query,
// 	resolvedUrl,
// }) => {
// 	try {
// 		return {
// 			props: {},
// 		};
// 	} catch (error) {
// 		throw error;
// 	}
// };

export default DashboardPage;

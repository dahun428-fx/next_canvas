import { LoadingBar } from '@/components/common/Loading/LoadingBar';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

type Props = {};

const ViolentCimePage = dynamic<Props>(
	() =>
		import('@/components/pages/ViolentCimePage').then(
			module => module.ViolentCimePage
		),
	{ ssr: false, loading: () => <LoadingBar /> }
);

const ViolentCrimeOffice: NextPage<Props> = ({}) => {
	return <ViolentCimePage />;
};

export default ViolentCrimeOffice;

import { useEffect } from 'react';
import { CrimeRegionPage as Presenter } from './CrimeRegionPage';
import { RegionResponse, setOperations } from '@/store/modules/common/region';
import { useDispatch } from 'react-redux';

type Props = {
	regionItems: RegionResponse[];
	initialYear: string;
};

export const CrimeRegionPage: React.FC<Props> = ({
	initialYear,
	regionItems,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		setOperations(dispatch)(regionItems);
	}, [regionItems, dispatch]);

	return <Presenter />;
};

CrimeRegionPage.displayName = 'CrimeRegionPage';

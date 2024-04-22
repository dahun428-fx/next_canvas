import { useEffect, useRef } from 'react';
import { CrimeRegionPage as Presenter } from './CrimeRegionPage';
import { searchRegionList } from '@/api/clients/services/open/region';
import { responseToRegionData } from '@/utils/openapi/region/region';
import { useSelector } from '@/store/hooks';
import { loadOperations, selectRegion } from '@/store/modules/common/region';
import { useDispatch } from 'react-redux';

type Props = {};
export const CrimeRegionPage: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const regionResponse = useSelector(selectRegion);

	const initialize = useRef(false);

	useEffect(() => {
		if (!initialize.current) {
			loadOperations(dispatch)();
			initialize.current = true;
		}
	}, [dispatch, regionResponse.items.length, initialize.current]);

	return <Presenter />;
};
CrimeRegionPage.displayName = 'CrimeRegionPage';

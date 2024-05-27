import { RegionResourceYear } from '@/api/clients/services/open/region';
import { AreaFixPage } from '@/components/pages/AreaFixPage';
import { useSelector } from '@/store/hooks';
import {
	loadOperations,
	selectRegionItems,
} from '@/store/modules/common/region';
import { NextPage } from 'next';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

type Props = {};

const AreaFix: NextPage<Props> = ({}) => {
	console.log('CrimeRegion');
	const dispatch = useDispatch();
	const regionResponse = useSelector(selectRegionItems);

	const resourceYears = useMemo(() => {
		const years = [...RegionResourceYear];

		const addYears = years.reduce<string[]>((prev, curr) => {
			if (!regionResponse.some(item => item.year === curr)) {
				return [...prev, curr];
			} else {
				return prev;
			}
		}, []);

		return addYears;
	}, [regionResponse]);

	useEffect(() => {
		console.log('resourceYears', resourceYears);
		loadOperations(dispatch)(resourceYears);
	}, [regionResponse, resourceYears]);

	return <AreaFixPage />;
};

export default AreaFix;

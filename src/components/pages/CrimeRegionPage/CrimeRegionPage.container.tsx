import { useEffect, useRef } from 'react';
import { CrimeRegionPage as Presenter } from './CrimeRegionPage';
import { useSelector } from '@/store/hooks';
import {
	RegionResponse,
	loadOperations,
	selectRegion,
	setOperations,
} from '@/store/modules/common/region';
import { useDispatch } from 'react-redux';
import { ChartType } from 'chart.js';
import {
	bottomBarAddChartTypesOpertion,
	bottomBarUpdatePageRouteOperation,
} from '@/store/modules/common/bottom';
import { GetStaticProps } from 'next';
import {
	RegionResourceYear,
	regionRequestPageNumber,
	regionRequestPerPage,
	searchRegionList,
} from '@/api/clients/services/open/region';
import { SearchRegionResponse } from '@/models/api/open/region/SearchRegionResponse';
import { changeToRegionalData } from '@/utils/openapi/region/region';

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

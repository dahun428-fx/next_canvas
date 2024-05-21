import React, { useEffect, useMemo, useRef } from 'react';
import { NationWidePage as Presenter } from './NationWidePage';
import { setOperations as violenceSetOperations } from '@/store/modules/common/violence';
import {
	RegionResponse,
	setOperations as regionSetOperations,
} from '@/store/modules/common/region';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { useDispatch } from 'react-redux';
import {
	PoliceCityMergedType,
	PoliceYearType,
	police_total_data_by_crime,
	police_total_data_by_year,
} from '@/utils/openapi/police/data';

type Props = {
	regionItems: RegionResponse[];
	violenceItems: SearchPoliceReseponse[];
	policeYearlyData: PoliceYearType[];
};

export const NationWidePage: React.FC<Props> = ({
	regionItems,
	violenceItems,
	policeYearlyData,
}) => {
	const initailized = useRef(false);

	const dispatch = useDispatch();

	// const policeTotalData: PoliceCityMergedType[] = useMemo(() => {
	// 	return police_total_data_by_crime(violenceItems);
	// }, [violenceItems]);

	// const policeYearlyData: PoliceYearType[] = useMemo(() => {
	// 	return police_total_data_by_year(violenceItems);
	// }, [violenceItems]);

	useEffect(() => {
		if (!initailized.current) {
			regionSetOperations(dispatch)(regionItems);
			violenceSetOperations(dispatch)(violenceItems);
			initailized.current = true;
		}
	}, [
		dispatch,
		violenceItems,
		violenceSetOperations,
		regionItems,
		regionSetOperations,
		initailized,
	]);
	return (
		<Presenter
			regionItems={regionItems}
			violenceItems={violenceItems}
			// policeTotalData={policeTotalData}
			policeYearlyData={policeYearlyData}
		/>
	);
};

NationWidePage.displayName = 'NationWidePage';

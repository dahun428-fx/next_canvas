import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NationWidePage as Presenter } from './NationWidePage';
import {
	loadOperations as violenceLoadOperation,
	selectViolenceItems,
	setOperations as violenceSetOperations,
} from '@/store/modules/common/violence';
import {
	RegionResponse,
	loadOperations as regionLoadOperation,
	setOperations as regionSetOperations,
	selectRegionItems,
} from '@/store/modules/common/region';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { useDispatch } from 'react-redux';
import {
	PoliceYearRange,
	PoliceYearType,
	police_total_data_by_year,
} from '@/utils/openapi/police/data';
import { SelectChangeEvent } from '@mui/material';
import { useSelector } from '@/store/hooks';

type Props = {
	regionItems: RegionResponse[];
	violenceItems: SearchPoliceReseponse[];
	policeYearlyData: PoliceYearType[];
	initialYear: string;
};

export const NationWidePage: React.FC<Props> = ({
	regionItems,
	violenceItems,
	policeYearlyData,
	initialYear,
}) => {
	const initailized = useRef(false);

	const dispatch = useDispatch();

	const [nowYear, setNowYear] = useState<PoliceYearRange>(
		initialYear as PoliceYearRange
	);

	const policeResponse = useSelector(selectViolenceItems);
	const regionResponse = useSelector(selectRegionItems);

	const datas = useMemo(() => {
		return police_total_data_by_year(policeResponse);
	}, [policeResponse, nowYear]);

	const hasItems = useMemo(() => {
		if (nowYear === initialYear) {
			return true;
		}
		return (
			policeResponse.some(item => item.year === nowYear) &&
			regionResponse.some(item => item.year === nowYear)
		);
	}, [policeResponse, regionResponse, nowYear]);

	useEffect(() => {
		if (!hasItems) {
			regionLoadOperation(dispatch)(nowYear);
			violenceLoadOperation(dispatch)(nowYear);
		}
	}, [nowYear, dispatch, hasItems]);

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
			nowYear={nowYear}
			setNowYear={(event: SelectChangeEvent) =>
				setNowYear(event.target.value as PoliceYearRange)
			}
			regionItems={regionResponse}
			violenceItems={policeResponse}
			policeYearlyData={datas}
			// policeTotalData={policeTotalData}
			// policeYearlyData={getData}
		/>
	);
};

NationWidePage.displayName = 'NationWidePage';

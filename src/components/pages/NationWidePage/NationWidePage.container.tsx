import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
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
	PoliceYearRange,
	PoliceYearType,
	police_total_data_by_crime,
	police_total_data_by_year,
} from '@/utils/openapi/police/data';
import { SelectChangeEvent } from '@mui/material';
import {
	fetchDataOperation,
	selectPolice,
	updateItemsOperations,
} from '@/store/modules/common/police';
import { useSelector } from '@/store/hooks';
import { SearchPoliceRequest } from '@/models/api/open/police/SearchPoliceRequest';
import {
	PoliceRequestPageNumberDefault,
	PoliceRequestPerPageDefault,
	searchPoliceList,
} from '@/api/clients/services/open/police';

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

	const getData = useMemo(async () => {
		if (nowYear === initialYear) {
			return policeYearlyData;
		}
		const year = nowYear;
		const page = PoliceRequestPageNumberDefault;
		const perPage = PoliceRequestPerPageDefault;
		const response = await searchPoliceList({
			page,
			perPage,
			year: year,
		});
		const searchItems: SearchPoliceReseponse = {
			...response,
			year: year,
		};
		const policeYearlyData = police_total_data_by_year([searchItems]);
		return policeYearlyData;
	}, [policeYearlyData, nowYear]);

	// const policeResponse = useSelector(selectPolice);
	// const policeTotalData: PoliceCityMergedType[] = useMemo(() => {
	// 	return police_total_data_by_crime(violenceItems);
	// }, [violenceItems]);

	// const policeYearlyData: PoliceYearType[] = useMemo(() => {
	// 	return police_total_data_by_year(violenceItems);
	// }, [violenceItems]);

	// const police_yearly_data = useMemo(async()=>{

	// },[dispatch, nowYear])

	// useEffect(() => {
	// 	fetchDataOperation(dispatch)(nowYear);
	// }, [dispatch, nowYear]);

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

	if (!policeYearlyData) {
		return null;
	}
	return (
		<Presenter
			nowYear={nowYear}
			setNowYear={(event: SelectChangeEvent) =>
				setNowYear(event.target.value as PoliceYearRange)
			}
			regionItems={regionItems}
			violenceItems={violenceItems}
			// policeTotalData={policeTotalData}
			policeYearlyData={getData}
		/>
	);
};

NationWidePage.displayName = 'NationWidePage';

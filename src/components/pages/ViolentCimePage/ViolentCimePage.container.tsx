import { useEffect, useMemo, useState } from 'react';
import { ViolentCimePage as Presenter } from './ViolentCimePage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { PoliceYearRange } from '@/utils/openapi/police/data';
import { RegionResourceYear } from '@/api/clients/services/open/region';
import {
	loadOperations,
	selectViolenceItems,
} from '@/store/modules/common/violence';
import { SelectChangeEvent } from '@mui/material';

type Props = {};

export const ViolentCimePage: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const policeResponse = useSelector(selectViolenceItems);

	const firstInitialYear = RegionResourceYear[RegionResourceYear.length - 1];

	const [nowYear, setNowYear] = useState<PoliceYearRange>(
		firstInitialYear as PoliceYearRange
	);

	const hasItems = useMemo(() => {
		return policeResponse.some(item => item.year === nowYear);
	}, [nowYear, policeResponse]);

	useEffect(() => {
		if (!hasItems) {
			loadOperations(dispatch)(nowYear);
		}
	}, [nowYear, dispatch, hasItems]);

	const filteredViolenceData = useMemo(() => {
		return (
			policeResponse.filter(item => item.year === nowYear)[0]?.data ?? null
		);
	}, [nowYear, policeResponse]);

	return (
		<Presenter
			nowYear={nowYear}
			policeDatas={filteredViolenceData}
			setNowYear={(event: SelectChangeEvent) =>
				setNowYear(event.target.value as PoliceYearRange)
			}
			hasItems={hasItems}
		/>
	);
};
ViolentCimePage.displayName = 'ViolentCimePage';

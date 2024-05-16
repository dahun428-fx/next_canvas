import React, { useEffect, useRef } from 'react';
import { NationWidePage as Presenter } from './NationWidePage';
import { useSelector } from '@/store/hooks';
import {
	selectViolence,
	setOperations as violenceSetOperations,
} from '@/store/modules/common/violence';
import {
	RegionResponse,
	selectRegion,
	setOperations as regionSetOperations,
} from '@/store/modules/common/region';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { useDispatch } from 'react-redux';

type Props = {
	regionItems: RegionResponse[];
	violenceItems: SearchPoliceReseponse[];
};

export const NationWidePage: React.FC<Props> = ({
	regionItems,
	violenceItems,
}) => {
	const initailized = useRef(false);

	const dispatch = useDispatch();

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
	return <Presenter regionItems={regionItems} violenceItems={violenceItems} />;
};

NationWidePage.displayName = 'NationWidePage';

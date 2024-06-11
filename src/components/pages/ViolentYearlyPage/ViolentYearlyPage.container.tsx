import React, { useEffect } from 'react';
import { ViolentYearlyPage as Presenter } from './ViolentYearlyPage';
import { setOperations } from '@/store/modules/common/violence';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { useDispatch } from 'react-redux';

type Props = {
	initialYear: string;
	violenceItems: SearchPoliceReseponse[];
};

export const ViolentYearlyPage: React.FC<Props> = ({
	initialYear,
	violenceItems,
}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		setOperations(dispatch)(violenceItems);
	}, [dispatch, violenceItems]);

	return <Presenter />;
};

ViolentYearlyPage.displayName = 'ViolentYearly';

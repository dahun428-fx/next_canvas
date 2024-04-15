import {
	PoliceResourceYears,
	searchPoliceList,
} from '@/api/clients/services/open/police';
import { useBoolState } from '@/hooks/state/useBoolState';
import { SearchPoliceRequest } from '@/models/api/open/police/SearchPoliceRequest';
import {
	PoliceState,
	selectPolice,
	updateItemsOperations,
} from '@/store/modules/common/police';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PoliceMain as Presenter } from './PoliceMain';
import { useSelector } from '@/store/hooks';

type Props = {
	page?: number;
	perPage?: number;
	year?: string;
};

export const PoliceMain: React.FC<Props> = ({
	page = 1,
	perPage = 250,
	year = '2022',
}) => {
	const {
		bool: loading,
		setTrue: showLoading,
		setFalse: hideLoading,
	} = useBoolState();

	const policeResponse: PoliceState = useSelector(selectPolice);

	const policeYears = [...PoliceResourceYears].reverse();
	const dispatch = useDispatch();

	const [searchPoliceRequest, setSearchPoliceRequest] = useState<
		Omit<SearchPoliceRequest, 'serviceKey'>
	>({
		page,
		perPage,
		year,
	});

	const reload = useCallback(
		async (request: Omit<SearchPoliceRequest, 'serviceKey'>) => {
			try {
				showLoading();

				const policeListResponse = await searchPoliceList({
					...searchPoliceRequest,
					...request,
				});

				updateItemsOperations(dispatch)(policeListResponse.data);
			} catch (error) {
				//Noop
			} finally {
				hideLoading();
			}
		},
		[
			dispatch,
			showLoading,
			hideLoading,
			page,
			year,
			perPage,
			searchPoliceRequest,
		]
	);
	return (
		<Presenter
			onReload={reload}
			searchPoliceRequest={searchPoliceRequest}
			policeResponse={policeResponse}
			policeYears={policeYears}
		/>
	);
};

PoliceMain.displayName = 'PoliceMain';

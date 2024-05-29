import { AreaFixPage as Presenter } from './AreaFixPage';
import { setOperations as violenceSetOperations } from '@/store/modules/common/violence';
import {
	RegionResponse,
	setOperations as regionSetOperations,
} from '@/store/modules/common/region';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
	PoliceCityMergedType,
	PoliceYearType,
} from '@/utils/openapi/police/data';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { MultiChartDataType } from '@/components/ui/chart/CustomChart';

type Props = {
	regionItems: RegionResponse[];
	violenceItems: SearchPoliceReseponse[];
	// policeYearlyData: PoliceYearType[];
	policeCrimeData: PoliceCityMergedType[];
	initialYear: string;
};

export const AreaFixPage: React.FC<Props> = ({
	initialYear,
	// policeYearlyData,
	regionItems,
	violenceItems,
	policeCrimeData,
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

	const multiChartDataFromCity = useCallback(
		(city: string) => {
			let datas: MultiChartDataType[] = [];
			policeCrimeData.forEach((item, index) => {
				if (item.city === city) {
					datas = [
						{
							label: '총합',
							data: item.total,
						},
						{
							label: '강도',
							data: item.강도,
						},
						{
							label: '살인',
							data: item.살인,
						},
						{
							label: '절도',
							data: item.절도,
						},
						{
							label: '폭력',
							data: item.폭력,
						},
					];
				}
			});
			return datas;
		},
		[policeCrimeData]
	);

	return (
		<Presenter
			regionItems={regionItems}
			multiChartDataFromCity={multiChartDataFromCity}
		/>
	);
};

AreaFixPage.displayName = 'AreaFixPage';

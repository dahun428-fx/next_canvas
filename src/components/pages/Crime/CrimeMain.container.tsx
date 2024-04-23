import {
	MouseEvent,
	SyntheticEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { CrimeMain as Presenter } from './CrimeMain';
import { regionCityArray } from '@/utils/openapi/region/region';
import { useSelector } from '@/store/hooks';
import { selectRegion, selectYear } from '@/store/modules/common/region';

type ChildPosition = {
	x: number;
	y: number;
};

export const CrimeMain: React.FC = () => {
	const selectedYear = useSelector(selectYear);
	const regionData = useSelector(selectRegion);

	const [selectedItemPosition, setSelectedItemPosition] =
		useState<ChildPosition | null>(null);
	const [selectedCity, setSelectedItem] = useState<string>(regionCityArray[0]);

	const onChangeSelectedItem = useCallback(
		(event: MouseEvent, value: string) => {
			const { screenX, screenY, clientX, clientY } = event;
			setSelectedItemPosition({ x: clientX, y: clientY });
			setSelectedItem(value);
		},
		[]
	);

	const data = useMemo(() => {
		const getDataByYear = regionData.items.filter(item => {
			if (item.year === selectedYear) {
				return item.items;
			}
		})[0];
		if (
			!getDataByYear ||
			!getDataByYear.items ||
			getDataByYear.items.length < 1
		) {
			return null;
		}

		const getDataByCityAndYear = getDataByYear.items.filter(item => {
			if (selectedCity.includes(item.city_name)) {
				return item;
			}
		})[0];
		// console.log(
		// 	'selectedYear, selectedItem ===> ',
		// 	selectedYear,
		// 	selectedCity,
		// 	getDataByYear,
		// 	getDataByCityAndYear
		// );
		// console.log('getDataByYear ===> ', getDataByYear);

		return getDataByCityAndYear;
	}, [selectedYear, selectedCity, regionData]);

	if (!regionData || regionData.items.length < 1 || !data) {
		return null;
	}

	return (
		<Presenter
			selectedData={data}
			selectedItem={selectedCity}
			setSelectedItem={onChangeSelectedItem}
			selectedItemPosition={selectedItemPosition}
		/>
	);
};

CrimeMain.displayName = 'CrimeMain';

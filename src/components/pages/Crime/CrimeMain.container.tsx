import { MouseEvent, useCallback, useMemo, useState } from 'react';
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
	const [selectedItem, setSelectedItem] = useState<string>(regionCityArray[0]);

	const onChangeSelectedItem = useCallback(
		(event: MouseEvent, value: string) => {
			const { screenX, screenY, clientX, clientY } = event;
			setSelectedItemPosition({ x: clientX, y: clientY });
			setSelectedItem(value);
		},
		[selectedItemPosition, selectedItem]
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
			if (selectedItem.includes(item.city_name)) {
				return item;
			}
		})[0];

		return getDataByCityAndYear;
	}, [selectedYear, selectedItem, regionData]);

	if (!regionData || regionData.items.length < 1 || !data) {
		return null;
	}

	return (
		<Presenter
			selectedData={data}
			selectedItem={selectedItem}
			setSelectedItem={onChangeSelectedItem}
			selectedItemPosition={selectedItemPosition}
		/>
	);
};

CrimeMain.displayName = 'CrimeMain';

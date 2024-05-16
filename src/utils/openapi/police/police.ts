import { ViolentData } from '@/components/pages/Violent/ViolentMain';
import {
	Police,
	SearchPoliceReseponse,
} from '@/models/api/open/police/SearchPoliceResponse';
import {
	Violence,
	ViolenceItem,
	ViolenceState,
} from '@/store/modules/common/violence';
import { isObject } from '@/utils/object';

export const policeCityArray = [
	'서울',
	'경기',
	'인천',
	'대전',
	'세종',
	'광주',
	'강원',
	'울산',
	'대구',
	'부산',
	'제주',
	'충북',
	'충남',
	'전북',
	'전남',
	'경북',
	'경남',
];

export const policeChartColor: { [key: string]: string } = {
	서울: '#FFC0CB',
	부산: '#FFDAB9',
	대구: '#E6E6FA',
	인천: '#B0E0E6',
	광주: '#F0E68C',
	대전: '#F5FFFA',
	울산: '#FFFACD',
	경기: '#77DD77',
	강원: '#89CFF0',
	충북: '#FDFD96',
	충남: '#F4C2C2',
	전북: '#CA9BF7',
	전남: '#A0D8EF',
	경북: '#F498AD',
	경남: '#87CEEB',
	제주: '#A7DBA8',
	세종: '#E6A4B4',
};

export const PoliceType = {
	ROBBER: '강도',
	MURDER: '살인',
	THEFT: '절도',
	VIOLENCE: '폭력',
} as const;

export type PoliceType = (typeof PoliceType)[keyof typeof PoliceType];

export const seperateByCity = (data: Police[], targetName?: string) => {
	const cityNames = new Set<string>(policeCityArray);

	return Array.from(cityNames).map((item, index) => {
		return data.filter((newItem, newIndex) => {
			if (
				isObject(newItem) &&
				newItem?.경찰서 !== null &&
				newItem.경찰서.slice(0, 2) === item
			) {
				return newItem;
			}
		});
	});
};

export const mergeByCity = (data: Police[]) => {
	const cityNames = new Set<string>(policeCityArray);

	return Array.from(cityNames).map((item, index) => {
		let 강도 = 0;
		let 살인 = 0;
		let 절도 = 0;
		let 폭력 = 0;
		data.filter((newItem, newIndex) => {
			if (
				isObject(newItem) &&
				newItem?.경찰서 !== null &&
				newItem.경찰서.slice(0, 2) === item
			) {
				강도 += newItem.강도;
				살인 += newItem.살인;
				절도 += newItem.절도;
				폭력 += newItem.폭력;
			}
		});
		return {
			city: item,
			강도,
			살인,
			절도,
			폭력,
		};
	});
};

export const get_data_by_city = (data: Violence[], city: string) => {
	const mergedData = mergeByCityWithYear(data);
	let datas: ViolentData[] = [];
	mergedData.forEach((item, index) => {
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
};

export const find_by_year_and_office = (
	datas: SearchPoliceReseponse[],
	year: PoliceYear,
	area?: string,
	office?: string
) => {
	const foundIndex = datas.findIndex(
		item => `${item.data[0].발생년도}` === year
	);
	if (foundIndex < 0) {
		return null;
	}

	let resultData = datas[foundIndex].data;
	if (area) {
		resultData = resultData.reduce((prev: ViolenceItem[], curr) => {
			if (curr.경찰서.includes(area)) {
				return [...prev, curr];
			} else {
				return prev;
			}
		}, []);
	}

	if (office) {
		resultData = resultData.reduce((prev: ViolenceItem[], curr) => {
			if (curr.경찰서 == office) {
				return [...prev, curr];
			} else {
				return prev;
			}
		}, []);
	}
	return resultData[0];
};

export const mergeByYearly = (violences: Violence[]) => {
	return violences.map((violence, index) => {
		const _data = mergeByCity(violence.data);
		const year = violence.data[0].발생년도
			? `${violence.data[0].발생년도}`
			: `${violence.data[0].발생연도}`;
		// return { [year]: _data };
		return { [year]: _data };
	});
	// return result;
};

/**
 * city :서울,
 *   강도 : [2014,2015,2016,2017,2018,2019,2020,2021,2022]
 *   살인 : [2014,2015,2016,2017,2018,2019,2020,2021,2022]
 *   절도 : [2014,2015,2016,2017,2018,2019,2020,2021,2022]
 *   폭력 : [2014,2015,2016,2017,2018,2019,2020,2021,2022]
 */
export const mergeByCityWithYear = (violences: Violence[]) => {
	const mergedByYearly = mergeByYearly(violences);

	let array: mergeByCityWithYearType[] = [];

	mergedByYearly.forEach((item, index) => {
		const items = Object.values(item);
		items.map(level2Item => {
			level2Item.map(level3Item => {
				const { city, 강도, 살인, 절도, 폭력 } = level3Item;
				const foundIndex = array.findIndex(
					arrayItem => arrayItem.city === city
				);
				const total = 강도 + 살인 + 절도 + 폭력;
				if (foundIndex >= 0) {
					array[foundIndex].강도 = [...array[foundIndex].강도, 강도];
					array[foundIndex].살인 = [...array[foundIndex].살인, 살인];
					array[foundIndex].절도 = [...array[foundIndex].절도, 절도];
					array[foundIndex].폭력 = [...array[foundIndex].폭력, 폭력];
					array[foundIndex].total = [...array[foundIndex].total, total];
				} else {
					let newArray = {
						city,
						강도: [강도],
						살인: [살인],
						절도: [절도],
						폭력: [폭력],
						total: [total],
					};

					array.push(newArray);
				}
			});
		});
	});

	return Array.from(array);
};

type mergeByCityWithYearType = {
	city: string;
	강도: number[];
	살인: number[];
	절도: number[];
	폭력: number[];
	total: number[];
};

const PoliceYear: { [key: number]: string } = {
	0: '2014',
	1: '2015',
	2: '2016',
	3: '2017',
	4: '2018',
	5: '2019',
	6: '2020',
	7: '2021',
	8: '2022',
} as const;

export type PoliceYear = (typeof PoliceYear)[keyof typeof PoliceYear];

export const getDataByYear = (
	originalData: Violence[],
	year: PoliceYear,
	type: 'total' | PoliceType
): { [key: string]: number } => {
	const map = new Map<string, number>();

	const idx = Object.keys(PoliceYear).find(
		key => PoliceYear[Number(key)] === year
	);

	if (idx) {
		mergeByCityWithYear(originalData).map((item, index) => {
			map.set(item.city, item[type][Number(idx)] ?? 0);
			// map.set(item.city, item[type][8] ?? 0);
		});
	}
	return Object.fromEntries(map);
};

export const getDataByCriminal = (
	originalData: Violence[],
	year: PoliceYear,
	included: PoliceType[]
) => {
	const idx = Object.keys(PoliceYear).find(
		key => PoliceYear[Number(key)] === year
	);
	const sortedData = mergeByCityWithYear(originalData);

	const map = new Map<PoliceType, number>();

	if (idx) {
		sortedData.map((item, index) => {
			if (included.some(item => item === '강도')) {
				map.set('강도', (map.get('강도') ?? 0) + item.강도[Number(idx)]);
			}
			if (included.some(item => item === '살인')) {
				map.set('살인', (map.get('살인') ?? 0) + item.살인[Number(idx)]);
			}
			if (included.some(item => item === '절도')) {
				map.set('절도', (map.get('절도') ?? 0) + item.절도[Number(idx)]);
			}
			if (included.some(item => item === '폭력')) {
				map.set('폭력', (map.get('폭력') ?? 0) + item.폭력[Number(idx)]);
			}
		});
	}
	return Object.fromEntries(map);
};

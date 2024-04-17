import { Police } from '@/models/api/open/police/SearchPoliceResponse';
import { Violence } from '@/store/modules/common/violence';

export const policeCityArray = [
	'서울',
	'부산',
	'대구',
	'인천',
	'광주',
	'대전',
	'울산',
	'경기',
	'강원',
	'충북',
	'충남',
	'전북',
	'전남',
	'경북',
	'경남',
	'제주',
	'세종',
];

export const PoliceType = {
	ROBBER: '강도',
	MURDER: '살인',
	THEFT: '절도',
	VIOLENCE: '폭력',
} as const;

export type PoliceType = (typeof PoliceType)[keyof typeof PoliceType];

export const seperateByCity = (data: Police[], targetName?: string) => {
	const cityNames = new Set<string>();
	data.forEach((item, index) => {
		const name = item.경찰서.slice(0, 2);
		cityNames.add(name);
	});
	return Array.from(cityNames).map((item, index) => {
		return data.filter((newItem, newIndex) => {
			if (newItem.경찰서.includes(item)) {
				return newItem;
			}
		});
	});
};

export const mergeByCity = (data: Police[]) => {
	const cityNames = new Set<string>();
	policeCityArray.map(item => {
		cityNames.add(item);
	});
	return Array.from(cityNames).map((item, index) => {
		let 강도 = 0;
		let 살인 = 0;
		let 절도 = 0;
		let 폭력 = 0;
		data.filter((newItem, newIndex) => {
			if (newItem.경찰서.includes(item)) {
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
				if (foundIndex >= 0) {
					array[foundIndex].강도 = [...array[foundIndex].강도, 강도];
					array[foundIndex].살인 = [...array[foundIndex].살인, 살인];
					array[foundIndex].절도 = [...array[foundIndex].절도, 절도];
					array[foundIndex].폭력 = [...array[foundIndex].폭력, 폭력];
				} else {
					let newArray = {
						city,
						강도: [강도],
						살인: [살인],
						절도: [절도],
						폭력: [폭력],
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
};

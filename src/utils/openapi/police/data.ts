import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { isObject } from 'chart.js/helpers';

/**
 * 모든 데이터를 도시별, 연도별로 변경한다.
 *
 * [{
 *  city : '',
 *  강도 : 0,
 *  살인 : 0,
 *  절도 : 0,
 *  폭력 : 0,
 * }, ...]
 * =>
 * [{
 *  city : 서울,
 *  강도 : [2014,2015,2016,2017,2018,2019,2020,2021,2022]
 *  살인 : [2014,2015,2016,2017,2018,2019,2020,2021,2022]
 *  절도 : [2014,2015,2016,2017,2018,2019,2020,2021,2022]
 *  폭력 : [2014,2015,2016,2017,2018,2019,2020,2021,2022]
 * },...]
 */
export const police_total_data_by_crime = (
	data: SearchPoliceReseponse[]
): PoliceCityMergedType[] => {
	let resultArray: PoliceCityMergedType[] = [];
	police_total_data_by_year(data).map((toplevel: PoliceYearType) => {
		toplevel.data.map((item: PoliceCityType) => {
			const { city, 강도, 살인, 절도, 폭력 } = item;
			const foundIndex = resultArray.findIndex(
				arrayItem => arrayItem.city === city
			);
			const total = 강도 + 살인 + 절도 + 폭력;
			if (foundIndex >= 0) {
				resultArray[foundIndex].강도 = [...resultArray[foundIndex].강도, 강도];
				resultArray[foundIndex].살인 = [...resultArray[foundIndex].살인, 살인];
				resultArray[foundIndex].절도 = [...resultArray[foundIndex].절도, 절도];
				resultArray[foundIndex].폭력 = [...resultArray[foundIndex].폭력, 폭력];
				resultArray[foundIndex].total = [
					...resultArray[foundIndex].total,
					total,
				];
			} else {
				let newArray = {
					city,
					강도: [강도],
					살인: [살인],
					절도: [절도],
					폭력: [폭력],
					total: [total],
				};

				resultArray.push(newArray);
			}
		});
	});

	return resultArray;
};

/**
 * 경찰서 데이터를 도시 이름 기준으로 Merge 한다.
 *
 * {
 *  강도 : 0,
 *  살인 : 0,
 *  절도 : 0,
 *  폭력 : 0,
 *  경찰서 : '',
 *  발생년도 : 0,
 * }
 *  =>
 * {
 *  city : '',
 *  강도 : 0,
 *  살인 : 0,
 *  절도 : 0,
 *  폭력 : 0,
 * }
 * @param data
 * @returns PoliceCityType[]
 */
export const police_city_data = (data: PoliceDataType[]): PoliceCityType[] => {
	return police_city.map((cityname, index) => {
		const filteredData = data.filter(item => {
			if (
				isObject(item) &&
				item?.경찰서 &&
				item.경찰서.slice(0, 2) === cityname
			) {
				return item;
			}
		});

		let 강도 = 0;
		let 살인 = 0;
		let 절도 = 0;
		let 폭력 = 0;
		let totalCount = 0;
		filteredData.forEach(item => {
			강도 += item.강도;
			살인 += item.살인;
			절도 += item.절도;
			폭력 += item.폭력;
			totalCount += item.강도 + item.살인 + item.절도 + item.폭력;
		});
		return {
			city: cityname,
			강도,
			살인,
			절도,
			폭력,
			totalCount,
		};
	});
};

/**
 * 데이터를 연도별, 도시별로 변경한다.
 *
 * =>
 * [[2014] : [{
 *  city : '',
 *  강도 : 0,
 *  살인 : 0,
 *  절도 : 0,
 *  폭력 : 0,
 * }, ...], [2015] : [...], ...]
 *
 * @param data : SearchPoliceReseponse[]
 * @return PoliceYearType[]
 */
export const police_total_data_by_year = (
	data: SearchPoliceReseponse[]
): PoliceYearType[] => {
	return data.map(police => {
		let totalCount = 0;
		const year = police.data[0].발생년도
			? `${police.data[0].발생년도}`
			: `${police.data[0].발생연도}`;

		const data = police_city_data(police.data);
		data.forEach(item => {
			totalCount += item.totalCount ?? 0;
		});
		return {
			year: year,
			data: data,
			totalCount,
		};
	});
};

export type PoliceCityMergedType = {
	city: string;
	강도: number[];
	살인: number[];
	절도: number[];
	폭력: number[];
	total: number[];
};

export type PoliceYearType = {
	year: string;
	data: PoliceCityType[];
	totalCount: number;
};

export type PoliceCityType = {
	city: string;
	강도: number;
	살인: number;
	절도: number;
	폭력: number;
	totalCount: number;
};

// export const PoliceCrimeType = {
// 	ROBBER: '강도',
// 	MURDER: '살인',
// 	THEFT: '절도',
// 	VIOLENCE: '폭력',
// } as const;

// export type PoliceCrimeType =
// 	(typeof PoliceCrimeType)[keyof typeof PoliceCrimeType];

// 	PoliceCrimeType.MURDER

export const police_city = [
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

export interface PoliceDataType {
	경찰서: string;
	발생년도: number;
	발생연도?: number;
	강도: number;
	살인: number;
	절도: number;
	폭력: number;
}

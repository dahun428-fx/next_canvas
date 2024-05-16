import {
	Police,
	SearchPoliceReseponse,
} from '@/models/api/open/police/SearchPoliceResponse';
import { Violence } from '@/store/modules/common/violence';
import { isObject } from 'chart.js/helpers';

export const mergeByYearly = (violences: Violence[]) => {
	return violences.map((violence, index) => {
		const _data = police_city_data(violence.data);
		const year = violence.data[0].발생년도
			? `${violence.data[0].발생년도}`
			: `${violence.data[0].발생연도}`;
		// return { [year]: _data };
		return { [year]: _data };
	});
	// return result;
};

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
	police_total_data_by_year(data).map((toplevel: PoliceYearType) => {
		//toplevel -> PoliceYearType
		return Object.values(toplevel).map((secondlevel: PoliceCityType[]) => {
			return secondlevel.map(item => {
				const { city, 강도, 살인, 절도, 폭력 } = item;
				// const foundIndex =
			});
		});
	});
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
		const filteredData = data.filter(
			item => item.경찰서.slice(0, 2) === cityname
		);

		let 강도 = 0;
		let 살인 = 0;
		let 절도 = 0;
		let 폭력 = 0;
		filteredData.forEach(item => {
			강도 += item.강도;
			살인 += item.살인;
			절도 += item.절도;
			폭력 += item.폭력;
		});
		return {
			city: cityname,
			강도,
			살인,
			절도,
			폭력,
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
		const year = police.data[0].발생년도
			? `${police.data[0].발생년도}`
			: `${police.data[0].발생연도}`;
		return {
			[year]: police_city_data(police.data),
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
	[year: string]: PoliceCityType[];
};

export type PoliceCityType = {
	city: string;
	강도: number;
	살인: number;
	절도: number;
	폭력: number;
};

const police_city = [
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

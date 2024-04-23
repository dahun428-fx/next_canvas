export const regionCityArray = [
	'서울',
	'경기',
	'부산',
	'대구',
	'인천',
	'광주',
	'대전',
	'울산',
	'강원',
	'충북',
	'충남',
	'전북',
	'전남',
	'경북',
	'경남',
	'제주',
	'세종',
	'기타도시',
	'도시이외',
];

export type RegionCategoryItem = {
	main: string;
	sub: string;
	count: number;
};

export type RegionItem = {
	city_name: string;
	year: string;
	category: RegionCategoryItem[];
	children?: RegionItem[];
	totalCount: number;
};

/*
[{city_name:서울, count: 0, children: []}, {city_name:경기, count : 0, children: [ ... ]   }]	
{ city_name : 서울, count: 0, 경기 : 0  }
*/

export const changeToRegionalData = (data: any[], year: string) => {
	const mainCategoryName = '범죄대분류';
	const subCategoryName = '범죄중분류';

	return regionCityArray.map(city => {
		let totalCount: number = 0;
		let category: RegionCategoryItem[] = [];
		let children: RegionItem[] = [];
		const regExp = new RegExp(city);
		let childMap = new Map<string, RegionCategoryItem[]>();
		data.forEach(
			(_data: { [key: string]: string | number }, _dataIdx: number) => {
				let main = String(_data[mainCategoryName]);
				let sub = String(_data[subCategoryName]);
				let keyObjArr = Object.keys(_data);
				let valueObjArr = Object.values(_data);
				let count = 0;
				//배열삭제 index
				let startIdx = Number.MAX_VALUE;
				//배열삭제 index
				let endIdx = 0;

				keyObjArr.forEach((key, keyIdx) => {
					let keyCityname = key.split(' ')[0];
					let keyChildname = key.split(' ')[1];
					if (keyCityname.match(regExp)) {
						count += Number(valueObjArr[keyIdx]);

						if (keyChildname) {
							let obj: RegionCategoryItem = {
								count: Number(valueObjArr[keyIdx]),
								main: main,
								sub: sub,
							};
							if (childMap.has(keyChildname)) {
								let array = childMap.get(keyChildname) ?? [];
								array = [...array, obj];
								childMap.set(keyChildname, array);
							} else {
								let array: RegionCategoryItem[] = [obj];
								childMap.set(keyChildname, array);
							}
						}
					}
				});
				//배열삭제 --> 중복 배열 삭제
				keyObjArr.splice(startIdx, endIdx - startIdx + 1);
				totalCount += count;
				category = [...category, { main, sub, count }];
			}
		);
		childMap.forEach((value, key, map) => {
			let totalCount = 0;
			value.forEach(v => {
				totalCount += v.count;
			});
			children.push({
				city_name: key,
				totalCount: totalCount,
				year: year,
				category: [...value],
			});
		});

		return {
			city_name: city,
			year: year,
			category: category,
			children: children,
			totalCount,
		};
	});
};

export const changeToChartData = (data: RegionCategoryItem[]) => {
	// Object.fromEntries({data.})

	// const regionMap = new Map<string, number>();
	const adjustData = data.map((item, index) => {
		// regionMap.set(item.sub, item.count);
		// return {
		// 	[item.sub]: item.count,
		// };
		return [`${item.sub}`, `${item.count}`];
	});
	// console.log('region map : ', regionMap);
	// const successData = Object.fromEntries(adjustData);
	// console.log('adjustdata', adjustData);
	// console.log('successData', successData);
	return Object.fromEntries(adjustData);
};

// export const responseToRegionData = (data: any[]): RegionItem[] => {
// 	const mainCategoryName = '범죄대분류';
// 	const subCategoryName = '범죄중분류';

// 	return data.map((item, index) => {
// 		const main_category = item[mainCategoryName];
// 		const sub_category = item[subCategoryName];

// 		const city_data = makeCityObject(item);

// 		return {
// 			main_category,
// 			sub_category,
// 			city_data,
// 		};
// 	});
// };

// const makeCityObject = (value: { [key: string]: number }): RegionCityData[] => {
// 	let keys = Object.keys(value);
// 	let values = Object.values(value);

// 	return regionCityArray.map((item, index) => {
// 		const regex = new RegExp(item);
// 		let children: RegionCityData[] = [];
// 		let cnt = 0;
// 		//배열삭제 index
// 		let startIdx = Number.MAX_VALUE;
// 		//배열삭제 index
// 		let endIdx = 0;
// 		keys.forEach((ele, idx) => {
// 			if (ele.match(regex)) {
// 				cnt += Number(values[idx]);
// 				let childCityName = ele.replace(regex, '').trim();
// 				if (childCityName) {
// 					children.push({
// 						city_name: childCityName,
// 						city_count: values[idx],
// 					});
// 				}
// 				startIdx = Math.min(idx, startIdx);
// 				endIdx = Math.max(idx, endIdx);
// 			}
// 		});
// 		//배열삭제 --> 중복 배열 삭제
// 		keys.splice(startIdx, endIdx - startIdx + 1);
// 		return {
// 			city_name: item,
// 			city_count: cnt,
// 			city_child: children,
// 		};
// 	});
// };

// export type RegionItem = {
// 	main_category: string;
// 	sub_category: string;
// 	city_data: RegionCityData[];
// };

// export type RegionCityData = {
// 	city_name: string;
// 	city_count: string | number;
// 	city_child?: RegionCityData[];
// };

/*

data : [
	{
		city_name : 서울,
		year:'',
		category : [
			{
				main : '',
				sub : '',
				count : 0,
			},
			{
				main : '',
				sub : '',
				count : 0,
			},
		],
		// children : [
		// 	{
		// 		city_name : '',
		// 		year: '',
		// 		category : [
		// 			{
		// 				main : '',
		// 				sub: '',
		// 				count : 0,
		// 			}
		// 		],
		// 	},
		// 	...
		// ]
		totalCount : 0
	}
]

*/

/*

    data : [
        {
            main_category: '',
            sub_category : '',
            city_data : [
                
                {
                    city_name : 서울,
                    city_count : 1,
                    city_child : []
                },
                {
                    city_name : 전남,
                    city_count : 20,
                    city_child: [
                        {
                            city_name: 거제,
                            city_count: 1,
                            city_child: []
                        }
                    ]
                }
            ]
        }
    ]
 */

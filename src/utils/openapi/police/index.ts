import { Police } from '@/models/api/open/police/SearchPoliceResponse';

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
	data.forEach((item, index) => {
		const name = item.경찰서.slice(0, 2);
		cityNames.add(name);
	});
	return Array.from(cityNames).map((item, index) => {
		// return data.filter((newItem, newIndex) => {
		// 	if (newItem.경찰서.includes(item)) {
		// 		return newItem;
		// 	}
		// });
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

/*
[{},{},{}...]
[{ name : [{},{},{},...] }, { name : [] }]
*/

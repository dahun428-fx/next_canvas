import { SearchRegionRequest } from '@/models/api/open/region/SearchRegionRequest';
import { SearchRegionResponse } from '@/models/api/open/region/SearchRegionResponse';
import { CancelToken } from 'axios';
import { openApi } from '../../openApi';

const API_KEY = `Ns5g8JcqOWSCela7ynku+0e3EUo0wOU7+A6+95T14Y34E9w/QxwRqsBaP8nMKxE2jFicfOgw13wrtOahWd/hQg==`;

const resource: { [key: string]: string } = {
	'2015': '/3074462/v1/uddi:7e73ac26-d0fa-4444-9c2e-81fdad4eff1b_201912061355',
	'2016': '/3074462/v1/uddi:10bde8f1-739c-4b66-b6a6-ccf5339a658e_201910221521',
	'2017': '/3074462/v1/uddi:f046e6e5-58f2-4716-8b74-be62f1a6c6fc_201910221520',
	'2018': '/3074462/v1/uddi:48e1d87b-aaf1-4274-bc0d-a234aeec3889',
	'2019': '/3074462/v1/uddi:c81b4639-53cd-4b18-95ce-f716cc6bf1ff',
	'2020': '/3074462/v1/uddi:5c067b9b-efe1-414a-8096-89b67ee686bf',
	'2021': '/3074462/v1/uddi:14dc5ecc-3702-4df9-9dae-cb2337bf93cb',
	'2022': '/3074462/v1/uddi:fe3ae686-8f7d-4d82-8c3a-901a02a0aa75',
} as const;

export const defaultPageNumber = 1;
export const defaultPerPage = 50;
export const RegionResourceYear = Object.keys(resource);

const url = `https://api.odcloud.kr/api`;

export function searchRegionList(
	request: SearchRegionRequest,
	cancelToken?: CancelToken
): Promise<SearchRegionResponse> {
	const { year } = request;
	const uddi = resource[year];
	if (uddi === undefined) {
		throw new Error('not found key in open api');
	}

	return openApi.get(
		`${url}${uddi}`,
		{ ...request, serviceKey: API_KEY },
		{ cancelToken }
	);
}

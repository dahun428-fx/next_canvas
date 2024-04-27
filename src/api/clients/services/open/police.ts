import { SearchPoliceRequest } from '@/models/api/open/police/SearchPoliceRequest';
import { SearchPoliceReseponse } from '@/models/api/open/police/SearchPoliceResponse';
import { openApi } from '../../openApi';
import { CancelToken } from 'axios';

// const API_KEY = `Ns5g8JcqOWSCela7ynku%2B0e3EUo0wOU7%2BA6%2B95T14Y34E9w%2FQxwRqsBaP8nMKxE2jFicfOgw13wrtOahWd%2FhQg%3D%3D`;
const API_KEY = `Ns5g8JcqOWSCela7ynku+0e3EUo0wOU7+A6+95T14Y34E9w/QxwRqsBaP8nMKxE2jFicfOgw13wrtOahWd/hQg==`;

// ex)https://api.odcloud.kr/api/15084592/v1/uddi:2eb5d218-6237-49be-ad8d-88c5063a979c?page=1&perPage=10&serviceKey=Ns5g8JcqOWSCela7ynku%2B0e3EUo0wOU7%2BA6%2B95T14Y34E9w%2FQxwRqsBaP8nMKxE2jFicfOgw13wrtOahWd%2FhQg%3D%3D

const resource: { [key: string]: string } = {
	'2014': `/15084592/v1/uddi:2eb5d218-6237-49be-ad8d-88c5063a979c`,
	'2015': `/15084592/v1/uddi:fbbfd36d-d528-4c8e-aa9b-d5cdbdeec669`,
	'2016': `/15084592/v1/uddi:21ec6fa1-a033-413b-b049-8433f5b446ff`,
	'2017': `/15084592/v1/uddi:67117bd9-5ee1-4e07-ae4a-bfe0861ee116`,
	'2018': `/15084592/v1/uddi:2d687e27-b5c3-4bdb-9b77-c644dcafcbc7`,
	'2019': `/15084592/v1/uddi:b6cc7731-181b-48e1-9a6c-ae81388e46b0`,
	'2020': `/15084592/v1/uddi:fdde1218-987c-49ba-9326-8e3ba276141e`,
	'2021': `/15084592/v1/uddi:943e757d-462b-4b3a-ab9f-9a8553637ca2`,
	'2022': `/15084592/v1/uddi:5e08264d-acb3-4842-b494-b08f318aa14c`,
} as const;

export const PoliceResourceYears = Object.keys(resource);

const url = `https://api.odcloud.kr/api`;

export function searchPoliceList(
	request: Omit<SearchPoliceRequest, 'serviceKey'>,
	cancelToken?: CancelToken
): Promise<SearchPoliceReseponse> {
	const { year } = request;
	const uddi = resource[year];
	if (uddi === undefined) {
		throw new Error('not found key in open api');
	}

	return openApi.get(
		// `${url}?serviceKey=${API_KEY}`,
		`${url}${uddi}`,
		{ ...request, serviceKey: API_KEY },
		{ cancelToken }
	);
}

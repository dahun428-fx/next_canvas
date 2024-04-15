import { OpenApiRequest } from '../OpenApiRequest';

export interface SearchPoliceRequest extends OpenApiRequest {
	year: string;
	page: number;
	perPage: number;
	serviceKey: string;
}

export const InitializePoliceRequest: Omit<SearchPoliceRequest, 'serviceKey'> =
	{
		page: 1,
		perPage: 250,
		year: '2022',
	};

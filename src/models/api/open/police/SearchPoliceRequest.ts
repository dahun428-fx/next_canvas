import { OpenApiRequest } from '../OpenApiRequest';

export interface SearchPoliceRequest extends OpenApiRequest {
	year: string;
	page: number;
	perPage: number;
}

export const InitializePoliceRequest: SearchPoliceRequest = {
	page: 1,
	perPage: 250,
	year: '2022',
};

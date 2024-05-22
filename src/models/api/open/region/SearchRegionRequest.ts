import { OpenApiRequest } from '../OpenApiRequest';

export interface SearchRegionRequest extends OpenApiRequest {
	year: string;
	page: number;
	perPage: number;
}

export const InitializeRegionRequest: SearchRegionRequest = {
	page: 1,
	perPage: 300,
	year: '2022',
};

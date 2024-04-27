import { OpenApiRequest } from '../OpenApiRequest';

export interface SearchRegionRequest extends OpenApiRequest {
	year: string;
	page: number;
	perPage: number;
	serviceKey: string;
}

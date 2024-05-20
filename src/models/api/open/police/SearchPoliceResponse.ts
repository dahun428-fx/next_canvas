import { OpenApiResponse } from '../OpenApiResponse';

export interface SearchPoliceReseponse extends OpenApiResponse {
	currentCount: number;
	data: Police[];
	matchCount: number;
	page: number;
	perPage: number;
	totalCount: number;
	year: string;
}

export interface Police {
	city?: string;
	강도: number;
	경찰서: string;
	발생년도: number;
	발생연도?: number;
	살인: number;
	절도: number;
	폭력: number;
}

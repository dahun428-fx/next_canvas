import { OpenApiResponse } from '../OpenApiResponse';

export interface SearchRegionResponse extends OpenApiResponse {
	currentCount: number;
	data: any[];
	matchCount: number;
	page: number;
	perPage: number;
	totalCount: number;
}

/*

    범죄대분류 ( MainCategory )
    범죄중분류 ( SubCategory )
    city : 8개
         : 전남 : [{
            광양 : 1, ....

         }]
export interface Police {
  city?: string;
  강도: number;
  경찰서: string;
  발생년도: number;
  살인: number;
  절도: number;
  폭력: number;
}

*/

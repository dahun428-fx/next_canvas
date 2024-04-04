import { ApiErrorResponse } from "@/models/api/ApiErrorResponse";

export interface OpenApiErrorResponse extends ApiErrorResponse {
  status: string;
  message?: string;
}

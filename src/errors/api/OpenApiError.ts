import { OpenApiErrorResponse } from "@/models/api/open/OpenApiErrorResponse";
import { ApiError } from "./ApiError";
import { AxiosError } from "axios";

export class OpenApiError extends ApiError<OpenApiErrorResponse> {
  constructor(error: AxiosError<OpenApiErrorResponse>) {
    super(error);
    this.name = "OpenApiError";
  }
}

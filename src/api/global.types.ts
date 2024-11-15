export interface IResponse<T> {
  message: string;
  data: T;
}

export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

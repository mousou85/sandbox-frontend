export interface ISuccessResponse {
  isSuccessful: true;
  data?: Record<string, any> | Record<string, any>[];
}
export interface IErrorResponse {
  isSuccessful: false;
  statusCode: number;
  error: string;
  message: string;
}

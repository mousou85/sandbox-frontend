/**
 * Base response interface
 */
export interface ISuccessResponse {
  isSuccessful: true;
  data?: any;
}

/**
 * Base list response interface
 */
export interface ISuccessListResponse {
  isSuccessful: true;
  data?: any[];
}

/**
 * Error response interface
 */
export interface IErrorResponse {
  isSuccessful: false;
  statusCode: number;
  error: string;
  message: string;
}

import {AxiosError} from 'axios';

import type {IErrorResponse} from '@/modules/api/interfaces';

/**
 * API error exception class
 */
export class ApiError extends AxiosError {
  public errorCode = '';

  constructor(error: AxiosError) {
    const {message, code, config, request, response} = error;

    super(message, code, config, request, response);
    if (response?.data) {
      const {error, message} = response.data as IErrorResponse;
      this.errorCode = error;
      this.message = message;
    }
  }
}

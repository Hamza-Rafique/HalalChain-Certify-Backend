import { Response } from 'express';

export class APIResponse {
  static success(res: Response, data: any, message: string = 'Success', statusCode: number = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, message: string = 'Internal Server Error', statusCode: number = 500, errors?: any[]) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors: errors || [],
    });
  }

  static validationError(res: Response, errors: any[]) {
    return this.error(res, 'Validation Failed', 422, errors);
  }
}
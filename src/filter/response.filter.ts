import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const res = exception.getResponse() as { message: string[] };
    response.statusCode = exception.getStatus();
    response.json({
      code: exception.getStatus(),
      message: 'fail',
      data: res?.message?.join?.(',') || exception.message,
    });
  }
}

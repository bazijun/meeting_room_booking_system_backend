import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response } from 'express';
import { Request } from 'express';

// 记录下访问的 ip、user agent、请求的 controller、method，接口耗时、响应内容，当前登录用户等信息。
@Injectable()
export class InvokeRecordInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InvokeRecordInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const userAgent = request.headers['user-agent'];

    const { ip, method, path } = request;

    const title = `【${method} ${path} ${ip} ${userAgent}】`;
    this.logger.debug(
      `${title}: ${context.getClass().name} ${
        context.getHandler().name
      } 已调用...`,
    );
    this.logger.debug(
      `user: ${request.user?.userId}, ${request.user?.username}`,
    );
    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        this.logger.debug(
          `${title}: ${response.statusCode}: ${Date.now() - now}ms`,
        );
        this.logger.debug(`Response: ${JSON.stringify(res)}`);
      }),
    );
  }
}

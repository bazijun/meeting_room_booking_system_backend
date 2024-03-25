import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
export const Userinfo = createParamDecorator<
  keyof Request['user'],
  ExecutionContext
>((data, ctx) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  if (!request.user) return null;
  return data ? request.user[data] : request.user;
});

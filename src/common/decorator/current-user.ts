import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentClient = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const requestObject = ctx.switchToHttp().getRequest<Request>();
    return requestObject.user;
  },
);

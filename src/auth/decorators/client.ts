import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Client = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return { ...request.user, agent: request.headers['user-agent'] };
  },
);

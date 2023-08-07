import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(ext: ExecutionContext) {
    const reqestObject = ext.switchToHttp().getRequest<Request>();

    try {
      const bearerToken = reqestObject.header('Authorization') || '';
      const token = bearerToken.split(' ')[1];

      const { sub } = this.jwtService.verify(token, {
        secret: process.env['JWT_SECRET'],
      });

      reqestObject.user = { id: sub };
      return true;
    } catch (error) {
      throw new UnauthorizedException('token is not valid or depricated');
    }
  }
}

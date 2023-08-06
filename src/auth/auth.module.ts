import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GithubStrategy, GoogleStrategy } from './strategies';
import { UserRepository } from './repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, UserRepository],
})
export class AuthModule {}

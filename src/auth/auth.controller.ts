import { Controller, Get, UseGuards, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Client } from './decorators';
import { ReigsterDto } from './dto';

import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async google() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Client() client: ReigsterDto) {
    const token = await this.authService.registery(client);
    return { token };
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async github() {}

  @Get('/github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Client() client: ReigsterDto) {
    const token = await this.authService.registery(client);
    return { token };
  }
}

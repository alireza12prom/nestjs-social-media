import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env['GOOGLE_CLIENT_ID'],
      callbackURL: process.env['GOOGLE_CALLBACK_URL'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      scope: ['profile', 'email'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = {
      provider: 'google',
      providerId: profile.id,
      email: profile.email,
    };
    done(null, user);
  }
}

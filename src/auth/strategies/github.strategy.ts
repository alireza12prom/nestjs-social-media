import { Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env['GITHUB_CLIENT_ID'],
      clientSecret: process.env['GITHUB_CLIENT_SECRET'],
      callbackURL: process.env['GITHUB_CALLBACK_URL'],
      scope: ['user:email', 'read:user'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    const user = {
      provider: 'github',
      providerId: profile.id,
      email: profile.emails[0].value,
    };
    done(null, user);
  }
}

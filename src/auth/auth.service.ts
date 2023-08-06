import { Injectable } from '@nestjs/common';
import { ReigsterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repository';
import { Token } from '../common/constant';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async registery(input: ReigsterDto) {
    const userId = await this.userRepository.createIfNotExists(input.email);
    return this.jwt(userId);
  }

  private async jwt(userId: string) {
    return this.jwtService.sign(
      { sub: userId },
      {
        algorithm: 'HS256',
        expiresIn: Token.JWT_EXPIRE_AT,
        secret: process.env['JWT_SECRET'],
      },
    );
  }
}

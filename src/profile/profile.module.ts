import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ConnectionRepository, UserRepository } from './repository';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ConnectionRepository, UserRepository],
})
export class ProfileModule {}

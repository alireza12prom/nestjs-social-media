import { Module } from '@nestjs/common';
import { ExplorerService } from './explorer.service';
import { ExplorerController } from './explorer.controller';
import { PostRepository, UserRepository } from './repository';

@Module({
  controllers: [ExplorerController],
  providers: [ExplorerService, UserRepository, PostRepository],
})
export class ExplorerModule {}

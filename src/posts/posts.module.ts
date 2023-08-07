import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FilesystemService } from '../common/service';
import { LikeRepository, PostRepository } from './repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, FilesystemService, PostRepository, LikeRepository],
})
export class PostsModule {}

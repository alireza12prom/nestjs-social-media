import { File } from '../common/constant';
import { PostsService } from './posts.service';
import { CurrentClient } from '../common/decorator';
import { AuthorizationGuard } from '../common/gaurd';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  CreatePostDto,
  DeletePostDto,
  GetPostDto,
  GetPostsDto,
  LikePostsDto,
  UnlikePostsDto,
} from './dto';

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';

@UseGuards(AuthorizationGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(
    FileInterceptor(File.KEY, {
      dest: process.env['MEDIA_FILE_DEST'],
    }),
  )
  @Post()
  create(
    @CurrentClient() clietn,
    @Body() body: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postsService.create(clietn.id, body, file);
  }

  @Get()
  findAll(@CurrentClient() client, @Query() query: GetPostsDto) {
    return this.postsService.getAllPosts(client.id, query);
  }

  @Get(':id')
  findOne(@CurrentClient() client, @Param() param: GetPostDto) {
    return this.postsService.getOnePost(client.id, param);
  }

  @Delete(':id')
  remove(@CurrentClient() client, @Param() param: DeletePostDto) {
    return this.postsService.deletePost(client.id, param);
  }

  @Post('likes/:postId')
  like(@CurrentClient() client, @Param() param: LikePostsDto) {
    return this.postsService.like(client.id, param);
  }

  @Delete('likes/:postId')
  unlike(@CurrentClient() client, @Param() param: UnlikePostsDto) {
    return this.postsService.unlike(client.id, param);
  }
}

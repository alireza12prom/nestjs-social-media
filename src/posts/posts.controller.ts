import { File } from '../common/constant';
import { PaginationDto } from '../common/dto';
import { PostsService } from './posts.service';
import { GetMediaDto } from './dto/get-meida.dto';
import { CurrentClient } from '../common/decorator';
import { AuthorizationGuard } from '../common/gaurd';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  CreateCommentDto,
  CreatePostDto,
  DeleteCommentDto,
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
  StreamableFile,
  ParseUUIDPipe,
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

  // @Delete(':id')
  remove(@CurrentClient() client, @Param() param: DeletePostDto) {
    return this.postsService.deletePost(client.id, param);
  }

  @Get('media/:id')
  async getMedia(@Param() param: GetMediaDto): Promise<StreamableFile> {
    const { buffer, mime, size } = await this.postsService.getMedia(param);
    return new StreamableFile(buffer, { type: mime, length: size });
  }

  @Post('likes/:postId')
  like(@CurrentClient() client, @Param() param: LikePostsDto) {
    return this.postsService.like(client.id, param);
  }

  @Delete('likes/:postId')
  unlike(@CurrentClient() client, @Param() param: UnlikePostsDto) {
    return this.postsService.unlike(client.id, param);
  }

  @Get('comments/:postId')
  getComments(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() query: PaginationDto,
  ) {
    return this.postsService.getComments({ postId, ...query });
  }

  @Post('comments')
  createComment(@CurrentClient() client, @Body() body: CreateCommentDto) {
    return this.postsService.createComment(client.id, body);
  }

  @Delete('comments')
  deleteComment(@CurrentClient() client, @Body() body: DeleteCommentDto) {
    return this.postsService.deleteComment(client.id, body);
  }
}

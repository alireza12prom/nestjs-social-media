import { Response } from 'express';
import { StreamService } from './stream.service';
import { AuthorizationGuard } from '../common/gaurd';
import {
  Controller,
  Get,
  Param,
  HttpException,
  Res,
  Headers,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';

@UseGuards(AuthorizationGuard)
@Controller('streams')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get('video/:fileId')
  async findAll(
    @Headers('range') range: string,
    @Res() res: Response,
    @Param('fileId') fileId: string,
  ) {
    if (!range) {
      throw new HttpException('please set range in header', 416);
    }

    const startRange = +range.replace('bytes=', '').split('-')[0] || 0;
    const { header, stream } = await this.streamService.streamVideo({
      fileId,
      startRange,
    });

    res.writeHead(206, header);
    stream.pipe(res);
  }

  @Get('photo/:fileId')
  async findOne(@Param('fileId') fileId: string) {
    const { photoSize, stream } = await this.streamService.streamPhoto({
      fileId,
    });

    return new StreamableFile(stream, { length: photoSize, type: 'image/png' });
  }
}

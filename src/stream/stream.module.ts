import { Module } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { FilesystemService } from '../common/service';

@Module({
  controllers: [StreamController],
  providers: [StreamService, FilesystemService],
})
export class StreamModule {}

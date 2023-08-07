import { Injectable, NotFoundException } from '@nestjs/common';
import { StreamPhotoDto, StreamVideoDto } from './dto';
import { FilesystemService } from '../common/service';
import { File, Stream } from '../common/constant';
import path from 'path';

@Injectable()
export class StreamService {
  constructor(private filesystem: FilesystemService) {}

  async streamVideo(input: StreamVideoDto) {
    const videoPath = path.join(File.VIDEO_PATH, input.fileId);
    console.log(videoPath);

    if (!this.filesystem.exists(videoPath)) {
      throw new NotFoundException("file didn't found");
    }

    const videoSize = this.filesystem.getSize(videoPath);
    const endRange = Math.min(
      input.startRange + Stream.VIDEO_STREAM_CHULK,
      videoSize - 1,
    );

    const header = {
      'Content-Range': `bytes ${input.startRange}-${endRange}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': endRange - input.startRange + 1,
      'Content-Type': 'video/mp4',
    };

    const stream = this.filesystem.openReadStream(videoPath, {
      start: input.startRange,
      end: endRange,
    });

    return { stream, header };
  }

  async streamPhoto(input: StreamPhotoDto) {
    const photoPath = path.join(File.PHOTO_PATH, input.fileId);
    if (!this.filesystem.exists(photoPath)) {
      throw new NotFoundException("photo didn't find");
    }

    const photoSize = this.filesystem.getSize(photoPath);
    const stream = this.filesystem.openReadStream(photoPath);
    return { stream, photoSize };
  }
}

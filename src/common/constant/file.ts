import path from 'path';

export const KEY = 'attached_file';
export const VALID_IMAGE_FORMAT = ['png', 'jpg', 'jpeg'];
export const VALID_VIDEO_FORMAT = ['mp4'];

export const VIDEO_PATH = path.join(
  process.env['MEDIA_FILE_DEST'],
  'posts/videos',
);

export const PHOTO_PATH = path.join(
  process.env['MEDIA_FILE_DEST'],
  'posts/photos',
);

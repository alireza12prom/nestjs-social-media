import { Injectable } from '@nestjs/common';
import fsPromise from 'fs/promises';
import fs from 'fs';

@Injectable()
export class FilesystemService {
  async move(from: string, to: string) {
    try {
      await fsPromise.rename(from, to);
      return true;
    } catch (error) {
      return false;
    }
  }

  async remove(path: string) {
    try {
      await fsPromise.unlink(path);
      return true;
    } catch (error) {
      return false;
    }
  }

  openReadStream(path: string, opt?: { start?: number; end?: number }) {
    return fs.createReadStream(path, opt);
  }

  getSize(path: string) {
    return fs.statSync(path).size;
  }

  exists(path: string) {
    return fs.existsSync(path);
  }
}

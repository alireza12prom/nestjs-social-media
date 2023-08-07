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

  async openReadStream(path: string) {
    try {
      return fs.createReadStream(path);
    } catch (error) {
      return null;
    }
  }

  async getSize(path: string) {
    try {
      return (await fsPromise.stat(path)).size;
    } catch (error) {
      return undefined;
    }
  }
}

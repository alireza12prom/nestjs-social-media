import { Injectable } from '@nestjs/common';
import { FindPeopleDto, FindPostDto } from './dto';
import { PostRepository, UserRepository } from './repository';

@Injectable()
export class ExplorerService {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {}

  async findPost(input: FindPostDto) {
    return await this.postRepository.find(input);
  }

  async findPeople(input: FindPeopleDto) {
    return await this.userRepository.find(input);
  }
}

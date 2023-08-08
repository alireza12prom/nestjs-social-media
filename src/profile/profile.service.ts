import { ConnectionRepository, UserRepository } from './repository';

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import {
  FollowProfileDto,
  GetFollowersDto,
  GetFollowingsDto,
  UnfollowProfileDto,
  UpdateProfileDto,
} from './dto';

@Injectable()
export class ProfileService {
  constructor(
    private userRepository: UserRepository,
    private connectionRepository: ConnectionRepository,
  ) {}

  async getProfile(userId: string) {
    return await this.userRepository.getOne(userId);
  }

  async updateProfile(userId: string, input: UpdateProfileDto) {
    if (input.email) {
      const isEmailExists = await this.userRepository.existsByEmail(
        input.email,
      );

      if (isEmailExists) {
        throw new BadRequestException('email is not unique');
      }
    }

    await this.userRepository.update({ userId, ...input });
  }

  async getFollowers(userId: string, input: GetFollowersDto) {
    return await this.connectionRepository.followers({
      userId: input.userId || userId,
      ...input,
    });
  }

  async getFollowings(userId: string, input: GetFollowingsDto) {
    return await this.connectionRepository.followings({
      userId: input.userId || userId,
      ...input,
    });
  }

  async follow(userId: string, input: FollowProfileDto) {
    if (userId == input.targetId) {
      throw new BadRequestException('you cannot follow yourself');
    }

    const haveConnection = await this.connectionRepository.exists({
      userId,
      targetId: input.targetId,
    });

    if (haveConnection) {
      throw new BadRequestException('you have already follow this profile');
    }

    const isTargetExists = await this.userRepository.existsById(input.targetId);

    if (!isTargetExists) {
      throw new NotFoundException("profile didn't find");
    }

    await this.connectionRepository.create({
      userId,
      targetId: input.targetId,
    });
  }

  async unfollow(userId: string, input: UnfollowProfileDto) {
    const haveConnection = await this.connectionRepository.exists({
      userId,
      targetId: input.targetId,
    });

    if (!haveConnection) {
      throw new BadRequestException('you have not follow this profile');
    }

    await this.connectionRepository.delete({
      userId,
      targetId: input.targetId,
    });
  }
}

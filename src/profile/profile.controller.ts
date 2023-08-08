import { ProfileService } from './profile.service';
import { CurrentClient } from '../common/decorator';
import { AuthorizationGuard } from '../common/gaurd';
import {
  UnfollowProfileDto,
  FollowProfileDto,
  GetProfileDto,
  GetFollowersDto,
  GetFollowingsDto,
  UpdateProfileDto,
} from './dto';

import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';

@UseGuards(AuthorizationGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@CurrentClient() client, @Query() query: GetProfileDto) {
    return this.profileService.getProfile(query.userId || client.id);
  }

  @Patch()
  updateProfile(@CurrentClient() client, @Body() body: UpdateProfileDto) {
    return this.profileService.updateProfile(client.id, body);
  }

  @Get('followers')
  getFollowers(@CurrentClient() client, @Query() query: GetFollowersDto) {
    return this.profileService.getFollowers(client.id, query);
  }

  @Get('followings')
  getFollowings(@CurrentClient() client, @Query() query: GetFollowingsDto) {
    return this.profileService.getFollowings(client.id, query);
  }

  @Post('connection')
  follow(@CurrentClient() client, @Body() body: FollowProfileDto) {
    return this.profileService.follow(client.id, body);
  }

  @Delete('connection')
  unfollow(@CurrentClient() client, @Body() body: UnfollowProfileDto) {
    return this.profileService.unfollow(client.id, body);
  }
}

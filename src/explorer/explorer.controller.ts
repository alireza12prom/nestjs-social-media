import { Controller, Get, Query } from '@nestjs/common';
import { FindPeopleDto, FindPostDto } from './dto';
import { ExplorerService } from './explorer.service';

@Controller('explorer')
export class ExplorerController {
  constructor(private explorerService: ExplorerService) {}

  @Get('posts')
  findPost(@Query() query: FindPostDto) {
    return this.explorerService.findPost(query);
  }

  @Get('users')
  findPeople(@Query() query: FindPeopleDto) {
    return this.explorerService.findPeople(query);
  }
}

import {
  IsNotEmpty,
  IsIn,
  IsArray,
  IsOptional,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @IsNotEmpty()
  body: string;

  @IsIn(['photo', 'video'])
  type: 'photo' | 'video';

  @Matches(/^#[a-zA-Z0-9\_]*/, { each: true, message: 'hashtag is not valid' })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  hashtag: string[] = [];
}

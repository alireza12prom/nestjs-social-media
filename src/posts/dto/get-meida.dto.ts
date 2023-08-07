import { IsNotEmpty } from 'class-validator';

export class GetMediaDto {
  @IsNotEmpty()
  id: string;
}

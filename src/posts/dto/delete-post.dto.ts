import { IsUUID } from 'class-validator';

export class DeletePostDto {
  @IsUUID(4)
  id: string;
}

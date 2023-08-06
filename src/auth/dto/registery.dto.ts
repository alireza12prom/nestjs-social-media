import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';

export class ReigsterDto {
  @IsIn(['google', 'github'])
  provider: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  agent: string;
}

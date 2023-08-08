import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  first_name: string = undefined;

  @IsString()
  @IsOptional()
  last_name: string = undefined;

  @IsEmail()
  @IsOptional()
  email: string = undefined;
}

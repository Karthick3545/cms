import { IsEmail, IsString, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  companyId: number;

  @IsString()
  role: string;
}

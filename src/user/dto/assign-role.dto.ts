import { IsEmail, IsNumber, IsString } from 'class-validator';

export class AssignRoleIdDto {
  @IsNumber()
  role: string;
}

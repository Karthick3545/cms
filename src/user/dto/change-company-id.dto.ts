import { IsEmail, IsNumber, IsString } from 'class-validator';

export class ChangeCompanyIdDto {
  @IsNumber()
  company_id: number;
}

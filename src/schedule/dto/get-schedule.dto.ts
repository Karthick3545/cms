import { IsEmail, IsNumber, IsString } from 'class-validator';

export class GetScheduleDto {
    @IsNumber()
    companyId: number;

}

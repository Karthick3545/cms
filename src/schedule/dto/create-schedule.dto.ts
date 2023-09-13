import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto {
    @IsNumber()
    companyId: number;

    @IsString()
    date: string;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;

    @IsNumber()
    contentId: number;

}

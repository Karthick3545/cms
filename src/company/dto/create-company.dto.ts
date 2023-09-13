import { IsEmail, IsString } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    phone: string;

    @IsString()
    description:string;
}

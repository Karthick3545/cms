import { IsNumber, IsString } from "class-validator";

export class CreateContentDto {
    @IsString()
    fileName: string;

    @IsString()
    filePath: string;

    @IsNumber()
    companyId: number;
}

import { IsString } from "class-validator";

export class CreateMacidDto {
    @IsString()
    name: string;

    @IsString()
    macId: string;

    @IsString()
    orientation: string;

    @IsString()
    location: string;
}

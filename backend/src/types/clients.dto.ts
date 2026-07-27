import { IsArray, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class CreateClientDTO {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsPhoneNumber("BR")
    number!: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    preferences!: string[]
}

export class UpdateClientDTO extends PartialType(CreateClientDTO) { }
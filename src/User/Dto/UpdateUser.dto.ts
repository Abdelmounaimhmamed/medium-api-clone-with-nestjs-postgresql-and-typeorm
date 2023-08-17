import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateUserDto {


    @IsOptional()
    @IsString()
    username : string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email : string ;

    @IsOptional()
    @IsString()
    image  : string

    @IsOptional()
    @IsString()
    bio: string;

}
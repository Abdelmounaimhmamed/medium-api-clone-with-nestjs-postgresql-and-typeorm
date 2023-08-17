import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    username : string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password : string;

    @IsString()
    bio: string;

    @IsString()
    image: string;
}
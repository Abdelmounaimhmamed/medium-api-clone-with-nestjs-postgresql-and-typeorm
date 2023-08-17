import { IsNotEmpty, IsOptional, IsString } from "class-validator";



export class UpdateArticleDto {

    @IsString()
    @IsNotEmpty()
    title :string;

    @IsString()
    @IsNotEmpty()
    description : string;


    @IsNotEmpty()
    @IsString()
    body : string;

    tagList?: string[];

}
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class createArticleDto {

    @IsString()
    @IsNotEmpty()
    title: string;


    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    body: string

    @IsOptional()
    tagList?: string[];

}
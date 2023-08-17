import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { AuthGuard } from "@app/User/Guards/auth.guards";
import { createArticleDto } from "./dto/createArticle.dto";
import { CurrentUser } from "@app/User/Decorators/User.decorator";
import { UserEntity } from "@app/User/User.entity";
import { ArticleResponseInterface } from "./Interfaces/ArticleResponse.interface";
import { DeleteResult } from "typeorm";
import { UpdateArticleDto } from "./dto/UpdateArticleDto";
import { ArticlesResponseInterface } from './Interfaces/ArticlesResponse.interface';



@Controller("articles")
export class ArticleController {

    constructor(private readonly articleService : ArticleService){}



    @UseGuards(AuthGuard)
    @Post(":slug/favorite")
    async addArticleToFavorites(@CurrentUser("id") userId , @Param("slug") slug: string) : Promise<ArticleResponseInterface>{

        const article = await  this.articleService.addArticleToFavorites(userId , slug);
        return this.articleService.buildArticleResponse(article);
    }

    @Delete(":slug/favorite")
    async removeArticleFromFavirotes(@CurrentUser("id") userID , @Param() slug :string){
        const article = await this.articleService.removeArticleFromFavorite(userID , slug);
        return this.articleService.buildArticleResponse(article);
    }

    @Get("/")
    async findAll(@CurrentUser("id") userId  : number , @Query() query : any) : Promise<ArticlesResponseInterface>  {
        return this.articleService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createArticle(@CurrentUser() currentUser:UserEntity ,@Body("article") article : createArticleDto) : Promise<ArticleResponseInterface>{
        console.log(article);
        const art=  await this.articleService.createArticle(currentUser , article);
        return this.articleService.buildArticleResponse(art);
    }


    @Get(":slug")
    async getArticleBySlug(@Param("slug") slug : string) : Promise<ArticleResponseInterface>{
        const article = await  this.articleService.getArticleBySlug(slug);
        return this.articleService.buildArticleResponse(article);
    }

    @Delete(":slug")
    @UseGuards(AuthGuard)
    async deleteArticle(@Param("slug") slug : string ,  @CurrentUser("id") userId : number ) : Promise<DeleteResult>{
        return this.articleService.deleteArticle(slug,userId);
    }

    @Put(":slug")
    @UseGuards(AuthGuard)
    async updateArticle(@Param("slug") slug : string,@CurrentUser("id") userId : number ,@Body("article") body:UpdateArticleDto ) : Promise<ArticleResponseInterface>{
        const article = await  this.articleService.updateArticle(slug,userId , body);
        return this.articleService.buildArticleResponse(article);
    }
    
    
}
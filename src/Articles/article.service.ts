import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleEntity } from "./Article.entity";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { createArticleDto } from "./dto/createArticle.dto";
import { UserEntity } from "@app/User/User.entity";
import { ArticleResponseInterface } from "./Interfaces/ArticleResponse.interface";
import slugify from "slugify";
import { UpdateArticleDto } from "./dto/UpdateArticleDto";
import { ArticlesResponseInterface } from "./Interfaces/ArticlesResponse.interface";



@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(ArticleEntity) private articleRepo : Repository<ArticleEntity>,
        private dataSource : DataSource,
        @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>,
        ){}

        async addArticleToFavorites(userId : number , slug : string): Promise<ArticleEntity> {
            const article = await this.getArticleBySlug(slug);
            const user = await this.userRepository.findOne({
                where : {id:userId},
                relations: ["favirotes"]
            })
            const isNotFavorite = user.favirotes.findIndex(articleFavirote => articleFavirote.id === article.id) === -1;

            if(isNotFavorite){
                user.favirotes.push(article);
                article.favoriteCount++;
                await this.userRepository.save(user);
                await this.articleRepo.save(article);
            }
            console.log(user);
            return article;
        }
        async removeArticleFromFavorite(userId : number , slug : string) : Promise<ArticleEntity>{
            const article = await this.articleRepo.findOne({where : {id : userId}});
            const user =  await this.userRepository.findOne({
                where : {id : userId},
                relations: ["favirotes"]
            });

            const articleIndex = user.favirotes.findIndex(articleFavorited => articleFavorited.id === article.id);
            if(articleIndex){
                user.favirotes.splice(articleIndex ,1);
                article.favoriteCount-- ;
                await this.articleRepo.save(article);
                await this.userRepository.save(user);
            }
            return article;
        }



        async findAll(query : any) : Promise<ArticlesResponseInterface>{
            const queryBuilder = this.dataSource.getRepository(ArticleEntity).createQueryBuilder(
                "articles"
            ).leftJoinAndSelect("articles.author" , "author");
            const articleCount = await queryBuilder.getCount();
            // const articles = await  this.articleRepo.find();
            // const articleCount = articles.length;
            if(query.tag){
                queryBuilder.andWhere('articles.tagList like  :tag' , {
                    tag : `%${query.tag}%`
                });
            }
            if(query.author){
                const author = await this.userRepository.findOne({
                    where : {username : query.author}
                })
                queryBuilder.andWhere("articles.authorId =  :id" , {
                    id : author.id
                });
            }

            queryBuilder.orderBy("articles.createAt");
            if(query.limit) {
                queryBuilder.limit(query.limit);
            }
            if(query.offset){
                queryBuilder.offset(query.offset)
            }
            
            const articles = await queryBuilder.getMany();
            return {articles , articleCount};
        }

    async createArticle(CurrentUser : UserEntity , article : createArticleDto) : Promise<ArticleEntity>{
        const Article: ArticleEntity = new ArticleEntity();
        Object.assign(Article,article);
        if(!Article.tagList){
            Article.tagList = [];
        }
        Article.author = CurrentUser ;
        Article.slug = this.generateSlug(article.title);
        console.log(Article);
        
        return  await this.articleRepo.save(Article);
    }

    async getArticleBySlug(slug : string) : Promise<ArticleEntity>{
        const article = await this.articleRepo.findOne({
            where : {slug },
        });
        if(!article){
            throw new HttpException("No article with this slug" , HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return article;
    }


    async deleteArticle(slug : string , userId : number) : Promise <DeleteResult>{
        const article = await this.getArticleBySlug(slug);
        if(!article){
            throw new HttpException("no article with this slug" , HttpStatus.NOT_FOUND);
        }
        if(article.author.id !== userId){
            throw new HttpException("You are not the autor !" , HttpStatus.UNAUTHORIZED);
        }

        return await this.articleRepo.delete({slug});
    }

    async updateArticle( slug :string ,userId : number , body : UpdateArticleDto) : Promise<ArticleEntity>{
        const article = await this.getArticleBySlug(slug);
        if(!article){
            throw new HttpException("no article founded !" , HttpStatus.NOT_FOUND);
        }
        if(article.author.id !== userId){
            throw new HttpException("not authorized !" , HttpStatus.UNAUTHORIZED);
        }
        Object.assign(article , body);
        return await this.articleRepo.save(article);
    }


    // reusable funccccccccc

    buildArticleResponse(article : ArticleEntity) : ArticleResponseInterface{
        return {article};
    }

    generateSlug(title : string) : string{
        return slugify(title , {lower: true}) + '-' + ((Math.random() * Math.pow(36 , 6) )| 0).toString(36);
    }
   

}
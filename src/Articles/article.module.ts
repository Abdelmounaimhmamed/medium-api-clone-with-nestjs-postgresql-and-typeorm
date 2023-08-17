import { Module } from "@nestjs/common";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./Article.entity";
import { UserEntity } from "@app/User/User.entity";



@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity , UserEntity])],
    controllers: [ArticleController],
    providers: [ArticleService]
})
export class ArticleModule{ 

}
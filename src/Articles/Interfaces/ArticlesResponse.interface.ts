import { ArticleEntity } from "../Article.entity";


export interface  ArticlesResponseInterface {

    articles : ArticleEntity[];
    articleCount : number;
}


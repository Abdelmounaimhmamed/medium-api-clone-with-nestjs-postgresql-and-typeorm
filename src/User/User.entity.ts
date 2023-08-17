import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";
import { ArticleEntity } from "@app/Articles/Article.entity";

@Entity({name: "users"})
export class UserEntity{

    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    username : string;

    @Column()
    email: string;

    @Column({default: ""})
    bio : string;

    @Column({default: ""})
    image: string;

    @Column({select: false})
    password : string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password , 10);
    }
    @OneToMany(() => ArticleEntity,(article) => article.author)
    articles: ArticleEntity[]
    
    @ManyToMany(() => ArticleEntity)
    @JoinTable()
    favirotes: ArticleEntity[];
}   
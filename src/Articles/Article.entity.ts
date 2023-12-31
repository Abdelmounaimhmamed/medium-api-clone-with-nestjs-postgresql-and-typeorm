import { UserEntity } from "@app/User/User.entity";
import { BeforeUpdate, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({name : "articles"})
export class ArticleEntity  {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    slug: string;

    @Column()
    title : string;

    @Column({default: ""})
    description: string;

    @Column({default: ""})
    body: string;

    @Column({type: "timestamp" , default: () => 'CURRENT_TIMESTAMP'})
    createAt : Date;

    @Column({type: "timestamp" , default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

    @Column('simple-array')
    tagList: string[];
 
    @Column({default: 0})
    favoriteCount : number;

    @BeforeUpdate()
    updateTimeTamp(){
        this.updatedAt = new Date();
    }
    @ManyToOne(() => UserEntity , (user) => user.articles , {eager: true})
    author: UserEntity


}
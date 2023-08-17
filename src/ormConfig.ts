import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { TagEntity } from "./tags/tag.entity";
import { UserEntity } from "./User/User.entity";
import { ArticleEntity } from "./Articles/Article.entity";


const ormConfig : PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    database: "mediumclone",
    username: "mediumclone",
    password: "123",
    entities: [TagEntity , UserEntity , ArticleEntity],
    synchronize: true,
    // migrations: ["./src/migrations/**/*.{.ts,.js}"]
    migrations: ["dist/migrations/*.js"]
}

export default ormConfig;
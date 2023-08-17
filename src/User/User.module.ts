import { Module } from "@nestjs/common";
import { UserController } from "./User.controller";
import { UserService } from "./User.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./User.entity";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { AuthGuard } from "./Guards/auth.guards";


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService,AuthMiddleware,AuthGuard],
    exports: [UserService]
})
export class UserModule {

}
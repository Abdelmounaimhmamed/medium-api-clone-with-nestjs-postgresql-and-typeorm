import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@app/User/User.entity";



@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [ProfileController],
    providers: [ProfileService]
})
export class ProfileModule { 


}
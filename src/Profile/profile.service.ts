import { UserEntity } from "@app/User/User.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileResponseInterface } from "./Interfaces/ProfileResponse.interface";
import { ProfileType } from "./Interfaces/profile.type";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";



@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>
    ){
       
    }

    async getUserProfile(username : string , currentUser : UserEntity) : Promise<ProfileType>{
        const user = await this.userRepository.findOne({
            where : {id : currentUser.id}
        });
        if(!user){
            throw new HttpException("NO user such found !",HttpStatus.NOT_FOUND);
        }

        return {...user , following : false};
    }

    async followUser(username : string , currentUser : UserEntity) : Promise<any>{

    }
    async unfollowUser(username : string , currentUser : UserEntity) : Promise<any>{

    }

    // reusable funcccc
    buildUserProfileResponse(profile : ProfileType) : ProfileResponseInterface{
        delete profile.email;
        return {
            profile
        } ;
    }


}
import { CurrentUser } from "@app/User/Decorators/User.decorator";
import { AuthGuard } from "@app/User/Guards/auth.guards";
import { UserEntity } from "@app/User/User.entity";
import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileResponseInterface } from "./Interfaces/ProfileResponse.interface";



@Controller("profiles")
export  class ProfileController {

    constructor(private profileService : ProfileService){}

    @Get(":username")
    async getProfile(@Param("username") username : string , @CurrentUser() currentUser : UserEntity) :Promise<ProfileResponseInterface>{
        const profile = await this.profileService.getUserProfile(username , currentUser);
        return this.profileService.buildUserProfileResponse(profile);
    }

    @Post(":username/follow")
    @UseGuards(AuthGuard)
    async followUser(@Param("username") username : string , @CurrentUser() user : UserEntity){

    }

    @Delete(":username/follow")
    @UseGuards(AuthGuard)
    async unfollowUser(@Param("username") username: string , @CurrentUser() user : UserEntity){

    }
}
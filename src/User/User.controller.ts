import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./User.service";
import { CreateUserDto } from "./Dto/CreateUser.dto";
import { userReponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./Dto/LoginUser.dto";
import { ExpressRequest } from "@app/GlobalTypes/ExpressRequest.interface";
import { UserEntity } from "./User.entity";
import { CurrentUser } from "./Decorators/User.decorator";
import { AuthGuard } from "./Guards/auth.guards";
import { UpdateUserDto } from "./Dto/UpdateUser.dto";





@Controller()
export class UserController{
    
    constructor(private readonly userService: UserService){}


    @Post("users")
    async createUser(@Body("user") createUserDto : CreateUserDto) : Promise<userReponseInterface>{
        const user = await  this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post("users/login")
    async loginUser(@Body("user") loginUserDto : LoginUserDto) : Promise<userReponseInterface> {
        const user = await this.userService.loginUser(loginUserDto);
        return this.userService.buildUserResponse(user);
    }

    // @Get("/user")
    // async currentUser(@Req() request : ExpressRequest):Promise<userReponseInterface>{
    //     const user =  request.user;
    //     return this.userService.buildUserResponse(user);
    // }

    @UseGuards(AuthGuard)
    @Get("user")
    async CurrentUser(@CurrentUser() user : any) : Promise<userReponseInterface>{
        return  this.userService.buildUserResponse(user);
    }

    @Put("user")
    @UseGuards(AuthGuard)
    async updateUser(@CurrentUser("id") currentUserId : number , @Body("user") body : UpdateUserDto ) : Promise<any>{
        const user = await this.userService.updateUser(currentUserId , body);
        return this.userService.buildUserResponse(user);
    }
    
}
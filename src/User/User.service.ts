import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./User.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./Dto/CreateUser.dto";
import { JWT_SECRET } from "@app/Confg";
import { userReponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./Dto/LoginUser.dto";
import  {compare} from "bcrypt";
import  {sign}  from "jsonwebtoken";
import { UpdateUserDto } from './Dto/UpdateUser.dto';



@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private userReposiroty : Repository<UserEntity>){}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{
        const userByEmail = await  this.userReposiroty.findOne({
            where : {email : createUserDto.email}
        });
        const userbyUsername = await this.userReposiroty.findOne({
            where : {username: createUserDto.username}
        })
        if(userByEmail || userbyUsername){
            throw new HttpException("username or email already in use" , HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const newUser :UserEntity = new UserEntity();
        Object.assign(newUser,createUserDto);
        console.log(newUser);
        return await this.userReposiroty.save(newUser);
    }

    async loginUser(loginUserDto : LoginUserDto) : Promise<UserEntity>{
        const userFounded = await this.userReposiroty.findOne({
            where : {email : loginUserDto.email},
            select: ["id" , "email" , "bio" ,"image" , "username" , "password"]
        });
        if(!userFounded){
            throw new HttpException("email or  wrong" , HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const isPassword =  await compare(loginUserDto.password , userFounded.password);
        console.log(isPassword);
        if(!isPassword){
            throw new HttpException("email or password wrong " , HttpStatus.BAD_REQUEST);
        }
        delete userFounded.password
        return userFounded;
    }

    async findUserById(id : number) : Promise<UserEntity>{
        return await this.userReposiroty.findOne({
            where : {id}
        })
    }

    async updateUser(userId : number , body:UpdateUserDto) : Promise<UserEntity>{
        const findTheUser = await this.userReposiroty.findOne({
            where : {id : userId}
        })
        if(!findTheUser){
            throw new HttpException("no user found ", HttpStatus.UNPROCESSABLE_ENTITY);
        }
        Object.assign(findTheUser , body);
        return this.userReposiroty.save(findTheUser);
    }

    // reusable funcupdateUsertion 
    generateToken(user: UserEntity) : string {
        return sign(
            {
                id : user.id , name : user.username , email : user.email
            } ,  JWT_SECRET );
    }

    buildUserResponse(user : UserEntity) : userReponseInterface{
        return {
            user: {
                ...user,
                token : this.generateToken(user)
            }
        }
    }


}
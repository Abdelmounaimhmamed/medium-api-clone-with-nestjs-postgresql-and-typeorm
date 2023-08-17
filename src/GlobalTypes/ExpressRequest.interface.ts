import { UserEntity } from "@app/User/User.entity";
import { Request } from "express";



export interface ExpressRequest extends Request {
    user? : UserEntity
}
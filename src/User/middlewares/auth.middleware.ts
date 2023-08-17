import { JWT_SECRET } from "@app/Confg";
import { ExpressRequest } from "@app/GlobalTypes/ExpressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../User.service";
const {verify} = require("jsonwebtoken");

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private userService : UserService){}

    async use(req: ExpressRequest, res: Response, next: NextFunction ) {
        if(!req.headers.authorization){
            req.user = null;
            next();
            return  ;
        }
        const token : string = req.headers.authorization.split(" ")[1];
        try {
            const decoded =  verify(token , JWT_SECRET);
            const user = await this.userService.findUserById(decoded.id);
            req.user = user;
            next();
        } catch (error) {
            req.user = null;
            next();
        }
    }
}
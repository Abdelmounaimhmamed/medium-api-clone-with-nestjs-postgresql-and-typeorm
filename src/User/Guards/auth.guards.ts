import { ExpressRequest } from "@app/GlobalTypes/ExpressRequest.interface";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";




@Injectable()
export class AuthGuard implements CanActivate {


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request  = context.switchToHttp().getRequest<ExpressRequest>();
        const user = request.user ;
        if(!user){
            throw new HttpException("Not Authorized !" , HttpStatus.UNAUTHORIZED);
        }
        return true;
    }

}
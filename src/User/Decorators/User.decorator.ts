import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const CurrentUser = createParamDecorator((data : any , context : ExecutionContext) => {

    const request = context.switchToHttp().getRequest();
    if(!request.user){
        return null;
    }
    if(data){
        return request.user[data]
    }
    const user = request.user;
    return user;
});
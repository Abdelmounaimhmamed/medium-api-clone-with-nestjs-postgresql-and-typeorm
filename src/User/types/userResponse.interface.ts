import { UserType } from "./user.types";


export interface userReponseInterface {
    user : UserType & {token : string}
}

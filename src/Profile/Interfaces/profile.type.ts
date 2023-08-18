import { UserType } from "@app/User/types/user.types";


export type ProfileType  = UserType & {following : boolean};
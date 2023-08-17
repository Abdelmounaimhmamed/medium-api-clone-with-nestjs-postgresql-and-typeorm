import { UserEntity } from "../User.entity";


export type UserType = Omit<UserEntity , "hashPassword">

import { Prisma, User } from "@prisma/client";

export interface IUserRepository{
    findByEmail(email:String):Promise<User | null>
    create(data:Prisma.UserCreateInput):Promise<User>

}
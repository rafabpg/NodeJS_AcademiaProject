import { Prisma, User } from "@prisma/client";

export interface IUserRepository{
    create(data:Prisma.UserCreateInput):Promise<User>,
    
}
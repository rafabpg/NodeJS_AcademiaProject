import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IUserRepository } from "./users-repository";

export class PrismaUserRepository implements IUserRepository{

    async findByEmail(email:string){
        const user = await  prisma.user.findUnique({
            where:{
                email:email
            }
        })
        return user;
    }

    async create(data:Prisma.UserCreateInput){
        const user = await  prisma.user.create({
           data
        })
        return user;
    }

    

}
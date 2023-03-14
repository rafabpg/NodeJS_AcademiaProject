import { Prisma, User } from "@prisma/client";
import { IUserRepository } from "../users-repository";

export class InMemoryUserRepository implements IUserRepository{

    public items:User[] = []

    async findByEmail(email:string){
        const user = this.items.find((item)=>item.email == email)
        if(!user){
            return null;
        }
        return user;
    }

    async create(data:Prisma.UserCreateInput){
        const user= {
            id:'user-1',
            name:data.name,
            email:data.email,
            password_hash:data.password_hash,
            create_at:new Date()
        }
        this.items.push(user)
        return user;
    }

    

}
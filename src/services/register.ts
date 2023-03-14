import { prisma } from "@/lib/prisma";
import { IUserRepository } from "@/repositories/users-repository";
import {hash} from 'bcryptjs';

interface RegisterRequest{
    name:string,
    email:string,
    password:string
}

export class RegisterService{

    constructor(private userRepository: IUserRepository){}

    async execute({name,email,password}:RegisterRequest){

        const password_hash = await hash(password,6);

        const userWithSameEmail = await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(userWithSameEmail) throw new Error('email already exist')


        await this.userRepository.create({name,email,password_hash})

    
    }
}
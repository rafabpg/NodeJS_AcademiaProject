import { IUserRepository } from "@/repositories/users-repository";
import {hash} from 'bcryptjs';
import { UserAlreadyExist } from "./errors/user-already-exist";
import { User } from "@prisma/client";

interface RegisterRequest{
    name:string,
    email:string,
    password:string
}

interface RegisterResponse{
    user:User
}

export class RegisterService{

    constructor(private userRepository: IUserRepository){}

    async execute({name,email,password}:RegisterRequest):Promise<RegisterResponse>{

        const password_hash = await hash(password,6);

        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if(userWithSameEmail) throw new UserAlreadyExist() 


        const user =  await this.userRepository.create({name,email,password_hash})
        return { 
            user
        };
    
    }
}
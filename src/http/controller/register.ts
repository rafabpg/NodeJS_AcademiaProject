import { z } from "zod";

import { FastifyRequest,FastifyReply } from "fastify";
import { PrismaUserRepository } from "@/repositories/prisma-users-repository";
import { RegisterService } from "@/services/register";
import { UserAlreadyExist } from "@/services/errors/user-already-exist";



export async function register(request:FastifyRequest,reply:FastifyReply){

    const registerBodySchema = z.object({
        name:z.string(),
        email:z.string().email(),
        password:z.string().min(6),
    })

    const {name,email,password} = registerBodySchema.parse(request.body);

    try {
        const prisma  = new PrismaUserRepository();
        const registerService = new RegisterService(prisma);
        await registerService.execute({name,email,password})
    } catch (error) {
        if(error instanceof UserAlreadyExist){
            return reply.status(409).send({mesage:error.message}); 
        }
        return reply.status(500).send(); 
    }
    return reply.status(201).send(); 
}
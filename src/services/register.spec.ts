import {expect,describe,it} from 'vitest';
import { RegisterService } from './register';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { compare } from 'bcryptjs';

describe('Register service',()=>{
    it('should hash user password ipon registration',async ()=>{
        const userRepository = new InMemoryUserRepository()
        const registerUser = new RegisterService(userRepository);
        const {user} = await registerUser.execute({
            name:'rafa',
            email:'teste@gmail.com',
            password:'12345',
        })

        const isPasswordHashed = await compare('12345',user.password_hash)

        expect(isPasswordHashed).toBe(true)
    })
})
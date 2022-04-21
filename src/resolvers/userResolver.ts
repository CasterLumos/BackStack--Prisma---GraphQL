import { Arg, Mutation, Query, Resolver } from "type-graphql";
import pkg from "jsonwebtoken";
import { User, UserData } from "../models/User";
import crypto from "crypto";
import * as dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import { prismaClient } from "../database/prismaClient";
dotenv.config();
const { sign } = pkg;

@Resolver()
export class UserResolver {
    private data: User[] =[];
    @Mutation(() => User)
    async createUser(@Arg('dataUser') dataUser: UserData) {
        const {name, address, city,phone,mail, password} = dataUser
        const id = crypto.randomUUID()
        const IV: string = (process.env.IV as string);
        const token = sign({id}, IV ,{expiresIn:86400,})
        const user = {name, address, city,phone,mail,token, password: bcrypt.hashSync(password, 12)}
        const user_db = await prismaClient.user.create({
            data: user
        })
        return user_db
    }
    @Query(() =>[User])
    async users() {
        return prismaClient.user.findMany()
    }
} 
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import pkg from "jsonwebtoken";
import { User, UserData } from "../models/User";
import crypto from "crypto";
import * as dotenv from "dotenv";
import bcrypt from 'bcryptjs';
dotenv.config();
const { sign } = pkg;

function generateToken(params = {}) {
    const IV: string = (process.env.IV as string);
    return sign(params, IV ,{expiresIn:86400,})
}


@Resolver()
export class UserResolver {
    private data: User[] =[];
    @Mutation(() => User)
    async createUser(@Arg('dataUser') dataUser: UserData) {
        const {name, address, city,phone,mail, password} = dataUser
        const id = crypto.randomUUID()
        const token = generateToken({ id })
        const ENCRYPTION_KEY: string = (process.env.ENCRYPTION_KEY as string);
        const user = {id, name, address, city,phone,mail,token, password: await bcrypt.hashSync(password, 12)}
        this.data.push(user)
        return user
    }
    @Query(() =>[User])
    async users() {
        return this.data;
    }
} 
import { Field, ID, InputType, ObjectType } from "type-graphql"

@ObjectType()
export class User {
    @Field(_type => ID)
    id: string;
    @Field()
    name: string;
    @Field()
    address: string;
    @Field()
    city: string;
    @Field()
    phone: string;
    @Field()
    mail: string;
    @Field()
    password: string;
    @Field()
    token: string;
}
@InputType()
export class UserData {
    @Field()
    name: string;
    @Field()
    address: string;
    @Field()
    city: string;
    @Field()
    phone: string;
    @Field()
    mail: string;
    @Field()
    password: string;
}
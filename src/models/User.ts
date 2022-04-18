import { Field, ID, ObjectType } from "type-graphql"

@ObjectType()
export class User {
    @Field(_type => ID)
    @Field()
    name: string;
}
import { Int } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql/dist/decorators";

export class User {
    @Field()
    id:number;

    @Field()
    username:string;

    @Field()
    password: string;
}

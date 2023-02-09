import { Int } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql/dist/decorators";

export class User {
    @Field(() =>Int )
    id:string;

    @Field()
    username:string;

    @Field()
    password: string;
  
}

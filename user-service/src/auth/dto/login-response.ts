import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";

@ObjectType()
export class LoginResponse {
    @Field()
    assess_token: string;

    @Field(()=> User )
    user: User;
}
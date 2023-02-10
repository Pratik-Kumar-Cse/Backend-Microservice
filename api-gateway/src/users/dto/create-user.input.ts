import { Field, InputType } from "@nestjs/graphql/dist/decorators";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateUserInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    username: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;


}
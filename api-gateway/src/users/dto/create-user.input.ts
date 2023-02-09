import { Field, InputType } from "@nestjs/graphql/dist/decorators";

@InputType()
export class CreateUserInput {

    @Field()
    username: string;

    @Field()
    password: string;


}
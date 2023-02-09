import { Field, InputType } from "@nestjs/graphql/dist/decorators";

@InputType()
export class CreateUserDto {
    
    @Field()
    username: string;

    @Field()
    password: string;

}

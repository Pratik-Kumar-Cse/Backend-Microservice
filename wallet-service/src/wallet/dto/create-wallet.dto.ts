import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateWalletDto {
    
    @Field()
    username: string;

    @Field()
    seeds: string;

}

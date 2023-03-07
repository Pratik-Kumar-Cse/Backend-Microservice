import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field()
  name: string;


  @Field()
  amount: number;


  @Field()
  price: number;
}

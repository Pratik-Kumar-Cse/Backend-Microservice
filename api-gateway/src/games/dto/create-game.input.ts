import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateGameInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;


  @Field()
  @IsNotEmpty()
  @IsNumber()
  amount: number;


  @Field()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

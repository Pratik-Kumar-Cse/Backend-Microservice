import { Field, ObjectType } from "@nestjs/graphql";
import {
    IsNotEmpty,
    IsString,
    Matches,
    MinLength
} from 'class-validator';


@ObjectType()
class User {

    @Field()
    readonly id: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Matches(/^[a-z0-9_-]+$/, {
        message:
            'Invalid username, must have both number and letters, be atleast 3 characters long and contain either _ or - '
    })
    readonly username: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    readonly password: string;


}


@ObjectType()
class Wallet {
    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Matches(/^[a-z0-9_-]+$/, {
        message:
            'Invalid username, must have both number and letters, be atleast 3 characters long and contain either _ or - '
    })
    readonly username: string;


    @Field()
    readonly publicKey: string;

    @Field()
    readonly privateKey: string;

}


@ObjectType()
export class Game {
    @Field()
    readonly id: string;

    @Field()
    readonly name: string;

    @Field()
    readonly amount: string;

    @Field()
    readonly price: string;
}


@ObjectType()
export class LoginMessageDef {
    @Field()
    readonly accessToken: string;

    @Field()
    readonly user: User;

    @Field()
    readonly status: boolean;
}


@ObjectType()
export class SignUpMessageDef {
    @Field()
    readonly status: boolean;

    @Field()
    readonly user: User;
}

@ObjectType()
export class WalletCreateMessageDef {
    @Field()
    readonly wallet: Wallet;

    @Field()
    readonly seeds: string;
}


@ObjectType()
export class WalletMessageDef {
    @Field()
    readonly wallet: Wallet;
}


@ObjectType()
export class ProfileMessageDef {
    @Field()
    readonly user: User;
}

@ObjectType()
export class CreateGameMessageDef {

    @Field()
    readonly game: Game;

    @Field()
    readonly success: boolean;

    @Field()
    readonly message: string;

}



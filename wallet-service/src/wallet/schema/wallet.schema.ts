import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
    @Prop()
    userId: string;

    @Prop()
    username: string;

    @Prop()
    publicKey: string;

    @Prop()
    privateKey: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { HelperService } from 'src/helper/helper.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './schema/wallet.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Wallet', schema: WalletSchema },
  ])],
  controllers: [WalletController],
  providers: [WalletService, HelperService]
})
export class WalletModule { }

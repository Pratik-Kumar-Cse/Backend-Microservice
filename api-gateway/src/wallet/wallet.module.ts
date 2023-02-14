import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletResolver } from './wallet.resolver';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [WalletResolver, WalletService, UsersService]
})
export class WalletModule {}

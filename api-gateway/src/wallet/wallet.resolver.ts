import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WalletService } from './wallet.service';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { WalletCreateMessageDef } from 'src/type-def/resolver-type';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Wallet)
export class WalletResolver {
  constructor(private readonly walletService: WalletService) { }

  @Mutation(() => WalletCreateMessageDef, { name: 'createWallet' })
  //@UseGuards(JwtAuthGuard)
  createWallet(@Args('createWalletInput') createWalletInput: CreateWalletInput) {
    console.log('createWallet');
    return this.walletService.createWallet(createWalletInput);
  }

  
}

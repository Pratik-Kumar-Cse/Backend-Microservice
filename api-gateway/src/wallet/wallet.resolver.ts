import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WalletService } from './wallet.service';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { WalletCreateMessageDef, WalletMessageDef } from 'src/type-def/resolver-type';
import { GetUserId, JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Wallet)
export class WalletResolver {
  constructor(private readonly walletService: WalletService) { }

  @Mutation(() => WalletCreateMessageDef, { name: 'createWallet' })
  @UseGuards(JwtAuthGuard)
  createWallet(@GetUserId() user ,@Args('createWalletInput') createWalletInput: CreateWalletInput) {
    if (user.username !== createWalletInput.username) {
      throw new Error('Invalid input');;
    }
    return this.walletService.createWallet(createWalletInput);
  }

  @Query(() => WalletMessageDef, { name: 'getWallet' })
  @UseGuards(JwtAuthGuard)
  getWallet(@GetUserId() user, @Args('createWalletInput') createWalletInput: CreateWalletInput) {
    if (user.username !== createWalletInput.username) {
      throw new Error('Invalid input');;
    }
    return this.walletService.getWallet(createWalletInput);
  }

  
}

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @GrpcMethod('WalletService', 'createWallet')
  createWallet(createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }

  @GrpcMethod('WalletService', 'getWallet')
  async getWallet(createWalletDto: CreateWalletDto) {
    const wallet = await this.walletService.getWallet(createWalletDto);
    return wallet;
  }


}

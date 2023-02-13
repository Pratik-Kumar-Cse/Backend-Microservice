import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @GrpcMethod('UserService', 'createWallet')
  createWallet(createWalletDto: CreateWalletDto) {
    console.log('hello world')
    return this.walletService.createWallet(createWalletDto);
  }

}

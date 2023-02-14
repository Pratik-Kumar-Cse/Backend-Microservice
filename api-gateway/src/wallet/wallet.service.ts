import { Injectable } from '@nestjs/common';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { WalletServiceInterface } from 'src/interfaces/wallet.interface';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { WalletServiceClientOptions } from './wallet.option';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WalletService {

  constructor(private readonly userService: UsersService){}

  @Client(WalletServiceClientOptions)
  private readonly walletServiceClient: ClientGrpc;

  private walletMicroService: any;

  onModuleInit() {
    this.walletMicroService =
      this.walletServiceClient.getService<WalletServiceInterface>(
        'WalletService'
      );
  }

  async createWallet(createWalletInput: CreateWalletInput) {
    const wallet = await this.walletMicroService.createWallet(createWalletInput);
    return wallet;
  }

  async getWallet(createWalletInput: CreateWalletInput) {
    const wallet = await this.walletMicroService.getWallet(createWalletInput);
    console.log(wallet);
    return this.walletMicroService.getWallet(createWalletInput);
  }


}

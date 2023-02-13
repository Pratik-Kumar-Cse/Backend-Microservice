import { Injectable } from '@nestjs/common';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { WalletServiceInterface } from 'src/interfaces/wallet.interface';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { WalletServiceClientOptions } from './wallet.option';

@Injectable()
export class WalletService {

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
    console.log(createWalletInput);
    return await this.walletMicroService.createWallet(createWalletInput)
  }


}

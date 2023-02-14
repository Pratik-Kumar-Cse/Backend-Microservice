import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import * as bip39 from 'bip39';
// import { ethers } from 'ethers';
//import bip39 from 'react-native-bip39'
import { hdkey } from 'ethereumjs-wallet';
import { HelperService } from 'src/helper/helper.service';
import { InjectModel } from '@nestjs/mongoose';
import { WalletDocument } from './schema/wallet.schema';
import { Model } from 'mongoose';


@Injectable()
export class WalletService {

  constructor(private helperService: HelperService,
    @InjectModel('Wallet') private WalletModel: Model<WalletDocument>) {

  }


  async createWallet(createWalletDto: CreateWalletDto) {

    try {
      const existWallet = await this.WalletModel.findOne({ username: createWalletDto.username })
      console.log({existWallet});
      if (existWallet) {
        throw new Error("Wallet already exists");
      }
      const seedPhrase = await bip39.generateMnemonic(128);
      console.log({ seedPhrase })
      let seed = await bip39.mnemonicToSeed(seedPhrase);

      // generate hdwallet from seed phrase
      const hdwallet = hdkey.fromMasterSeed(seed);

      // from BIP44, HD derivation path is:
      // m / purpose’ / coin_type’ / account’ / change / address_index
      const path = "m/44'/60'/0' / 0 / 0";
      const wallet = hdwallet.derivePath(path).getWallet();

      const encryptedPrivateKey: any =
        await this.helperService.encryptString(wallet.getPrivateKeyString());

      const walletObj = {
        username: createWalletDto.username,
        publicKey: wallet.getAddressString(),
        privateKey: encryptedPrivateKey
      }

      const createdWallet = new this.WalletModel(walletObj);
      await createdWallet.save();
      return { wallet: createdWallet, seeds: seedPhrase };
    }
    catch (err) {
      throw err;
    }

  }



  async getWallet(createWalletDto: CreateWalletDto) {
    const existWallet = await this.WalletModel.findOne({ username: createWalletDto.username })
    console.log(existWallet);
    if (!existWallet) {
      throw new Error("Wallet not exists");
    }
    const wallet = {username: existWallet.username, publicKey: existWallet.publicKey, privateKey: existWallet.privateKey}
 
    return wallet;
  }

}

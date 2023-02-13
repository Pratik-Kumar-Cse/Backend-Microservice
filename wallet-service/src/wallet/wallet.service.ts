import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import * as bip39 from 'bip39';
// import { ethers } from 'ethers';
//import bip39 from 'react-native-bip39'
import { hdkey } from 'ethereumjs-wallet';


@Injectable()
export class WalletService {
  async createWallet(createWalletDto: CreateWalletDto) {

    const seedPhrase = await bip39.generateMnemonic(128);
    console.log({seedPhrase})
    let seed = await bip39.mnemonicToSeed(seedPhrase);
    console.log({seed});

    // generate hdwallet from seed phrase
    const hdwallet = hdkey.fromMasterSeed(seed);

    // from BIP44, HD derivation path is:
    // m / purpose’ / coin_type’ / account’ / change / address_index
    const path = "m/44'/60'/0' / 0 / 0";
    const wallet = hdwallet.derivePath(path).getWallet();

    console.log({wallet});
    console.log("privateKey: " + wallet.getPrivateKeyString());
    console.log("address: " + wallet.getAddressString());

    // split seed phrase string to seed phrase array of strings
    const seedPhraseList = seedPhrase.split("");

    console.log("seed phrase: " + seedPhraseList);
  
    // const mnemonic = await bip39.generateMnemonic();
    // console.log(mnemonic);
    // let path = 1;
    // const derivationPath = "m/44'/60'/0'/0/";
    // path++;
    // const mnemonicWallet = ethers.Wallet.fromMnemonic(
    //   mnemonic,
    //   `${derivationPath}${path}`
    // );
    // const privateKey: string = mnemonicWallet.privateKey;
    // const address: string = mnemonicWallet.address;
    // const newAddress = {
    //   address: address,
    //   privateKey: privateKey,
    //   path: `m/${path}`
    // };
  }

}

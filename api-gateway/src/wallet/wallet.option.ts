import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const WalletServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:8082',
    package: 'wallet',
    protoPath: join(__dirname, '../proto/wallet.proto'),
  },
};

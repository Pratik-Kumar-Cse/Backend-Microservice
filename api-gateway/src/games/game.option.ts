import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';


export const GameServiceClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: "localhost:8084",
        package: 'game',
        protoPath: join(__dirname, '../proto/game.proto'),
    }
};
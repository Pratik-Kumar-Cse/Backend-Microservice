import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';


export const UserServiceClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: "localhost:8081",
        package: 'user',
        protoPath: join(__dirname, './user.proto'),
    }
};

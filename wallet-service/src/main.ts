import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: "localhost:8082",
      package: 'wallet',
      protoPath: join(__dirname, './proto/wallet.proto'),
    }
  });

  await app.listen();
}
bootstrap();

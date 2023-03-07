import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.GRPC,
    options: {
      url: 'localhost:8084',
      package: 'game',
      protoPath: join(__dirname,'./proto/game.proto'),
    }
  });
  await app.listen();
}
bootstrap();

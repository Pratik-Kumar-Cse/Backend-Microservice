import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.GRPC,
    options:{
      url: "localhost:8083",
      package: 'order',
      protoPath: join(__dirname,'./proto/order.proto'),
    }
  });
  await app.listen();
}
bootstrap();

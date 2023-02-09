import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [WalletModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_LOCAL_URI') //'mongodb://localhost:27017'//'mongodb+srv://New_user:fNBU1DcDzXsycT5L@cluster0.0cpdt.mongodb.net/?retryWrites=true&w=majority'//configService.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService]
    }),
  ],

})
export class AppModule { }

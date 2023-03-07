import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';



@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_LOCAL_URI') //'mongodb://localhost:27017'//'mongodb+srv://New_user:fNBU1DcDzXsycT5L@cluster0.0cpdt.mongodb.net/?retryWrites=true&w=majority'//configService.get<string>('MONGODB_URI')
    }),
    inject: [ConfigService]
  }),
    AuthModule, UserModule],

})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from 'src/user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';



@Module({
    imports: [
        UserModule,
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '60s',
            },
        }),
        // JwtModule.registerAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: (configService: ConfigService) => {
        //         console.log(configService.get('JWT_SECRET'));
        //         return {
        //             secret: 'hello', //configService.get<string>('JWT_SECRET'),
        //             signOptions: {
        //                 expiresIn: 3600,
        //             },
        //         };
        //     },
            
        // }),
        // JwtModule.register({
        //     secret: new ConfigService().get('JWT_SECRET'),
        //     signOptions: { expiresIn: '8h' },
        // }),
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
        ])
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }


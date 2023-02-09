import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.schema';
import { LocalStrategy } from 'src/auth/local.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ])],
  controllers: [UserController, AuthController],
  providers: [UserService, JwtService, AuthService,LocalStrategy],
  exports: [UserService]
})
export class UserModule { }

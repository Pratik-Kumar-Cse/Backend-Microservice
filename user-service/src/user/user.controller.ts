import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Context } from '@nestjs/graphql';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller()
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService) { }

  @GrpcMethod('UserService', 'createAccount')
  createAccount(createUserDto: CreateUserDto) {
    return this.userService.createAccount(createUserDto);
  }


  // @GrpcMethod('UserService', 'signup')
  // signup(loginUserDto: LoginUserDto) {
  //   console.log(loginUserDto);
  //   return this.authService.signup(loginUserDto);
  // }

  @GrpcMethod('UserService', 'findAll')
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return this.userService.findAll();
  }

  // @GrpcMethod('UserService', 'findOne')
  // findOne() {
  //   return this.userService.findOne();
  // }


}

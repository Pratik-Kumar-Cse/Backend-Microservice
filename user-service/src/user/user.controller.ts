import { Controller, Param, UseGuards } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Args, Context } from '@nestjs/graphql';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';


interface IUserName {
  username: string;
}

@Controller()
export class UserController {


  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService) { }

  @GrpcMethod('UserService', 'createAccount')
  createAccount(createUserDto: CreateUserDto) {
    return this.userService.createAccount(createUserDto);
  }



  @GrpcMethod('UserService', 'findAll')
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return this.userService.findAll();
  }

  

  @GrpcMethod('UserService', 'getProfile')
  async getProfile(username: IUserName) {
    console.log(username);
    const user = await this.userService.findOne(username.username);
    console.log(user);
    return user;
  }


}

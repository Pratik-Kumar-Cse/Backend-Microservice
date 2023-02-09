import { Injectable } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { UserServiceInterface } from 'src/interfaces/user.interface';
import { UserServiceClientOptions } from './user.option';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  
  findOne() {
    "hello";
  }

  @Client(UserServiceClientOptions)
  private readonly userServiceClient: ClientGrpc;

  private userMicroService: any;

  onModuleInit() {
    this.userMicroService =
      this.userServiceClient.getService<UserServiceInterface>(
        'UserService'
      );
  }

  signup(createUserDto: CreateUserInput) {
    return this.userMicroService.signup(createUserDto);
  }

  async login(createUserDto: CreateUserInput) {
    const response = await this.userMicroService.login(createUserDto).toPromise();
    return response;
  }

  async getProfile(username: string) {
    return this.userMicroService.getProfile(username);
  }

}

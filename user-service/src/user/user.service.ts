import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {


  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) { }


  async createAccount(createUserDto: CreateUserDto) {
    try {
      const user = {
        ...createUserDto,
        id: uuid(),
      }
      const createdUser = new this.UserModel(user);
      await createdUser.save();
      return user;
    }
    catch (error) {
      console.log(error);
      return error;
    }

  }

  async findOne(username: string) {
    return this.UserModel.findOne({ username: username });
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find();
  }

}

import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { LoginMessageDef, ProfileMessageDef, SignUpMessageDef } from "./type-def/resolver-type";
import { CreateUserInput } from "./dto/create-user.input";
import { UsersService } from "./users.service";
import { UseGuards,Request } from "@nestjs/common";
import { GetUserId, JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => SignUpMessageDef, { name: 'signup' })
  signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.signup(createUserInput);
  }

  @Mutation(() => LoginMessageDef, { name: 'login' })
  login(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.login(createUserInput);
  }

  @Query(() => SignUpMessageDef, { name: 'findOne' })
  findOne() {
    return this.usersService.findOne();
  }

  @Query(() => ProfileMessageDef, { name: 'getProfile' })
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUserId() user, @Args('input') username: string)  {
    if(user.username !== username) {
      throw new Error('Invalid input');;
    }
    return this.usersService.getProfile(username);
  }

}

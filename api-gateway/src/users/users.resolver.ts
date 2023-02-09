import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { LoginMessageDef, ProfileMessageDef, SignUpMessageDef } from "./type-def/resolver-type";
import { CreateUserInput } from "./dto/create-user.input";
import { UsersService } from "./users.service";

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
  getProfile(@Args('input') username: string)  {
    return this.usersService.getProfile(username);
  }

}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { CreateGameMessageDef, Game } from 'src/type-def/resolver-type';
import { GetUserId, JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) { }

  @Mutation(() => CreateGameMessageDef, { name: "createGame" })
  @UseGuards(JwtAuthGuard)
  createGame(@GetUserId() user, @Args('createGameInput') createGameInput: CreateGameInput) {
    console.log(createGameInput);
    console.log(user)
    return this.gamesService.createGame(createGameInput);
  }

}

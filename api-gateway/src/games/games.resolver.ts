import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { CreateGameMessageDef } from 'src/type-def/resolver-type';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => CreateGameMessageDef,{name: "createGame"})
  @UseGuards(JwtAuthGuard)
  createGame(@Args('createGameInput') createGameInput: CreateGameInput) {
    return this.gamesService.createGame(createGameInput);
  }

}

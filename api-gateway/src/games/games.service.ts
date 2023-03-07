import { Injectable } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { GameServiceClientOptions } from './game.option';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GameServiceInterface } from 'src/interfaces/game.interface';

@Injectable()
export class GamesService {
  private gameMicroService: any;

  @Client(GameServiceClientOptions)
  private readonly gameServiceClient: ClientGrpc;


  onModuleInit() {
    this.gameMicroService =
      this.gameServiceClient.getService<GameServiceInterface>(
        'GameService'
      );
  }


  createGame(createGameInput: CreateGameInput) {
    return this.gameMicroService.createGame(createGameInput);
  }

}

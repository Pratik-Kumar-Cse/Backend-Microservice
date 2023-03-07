import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @GrpcMethod('GameService','createGame')
  createGame(createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

}

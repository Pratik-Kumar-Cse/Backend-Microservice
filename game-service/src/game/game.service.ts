import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Model } from 'mongoose';
import { Game } from 'src/interface/game.interface';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GameService {

  constructor(@InjectModel('Game') private GameModel: Model<Game>) {

  }

  async createGame(createGameDto: CreateGameDto) {
    try {

      const checkGame = await this.findByName(createGameDto.name);

      if (checkGame) {
        throw new Error("Game already exists");
      }

      const game = {
        id: uuid(),
        name: createGameDto.name,
        amount: createGameDto.amount,
        price: createGameDto.price,
      }

      const gameModel = new this.GameModel(game);
      await gameModel.save();

      return {
        game: gameModel,
        success: true,
        message: "successfully created game"
      }


    } catch (error) {
      return error
    }
  }


  async findById(id: string) {
    try {

      const game = await this.GameModel.findOne({ id: id });

      return game;

    } catch (error) {
      return error;
    }
  }

  async findByName(name: string) {
    try {

      const game = await this.GameModel.findOne({ name: name });

      return game;

    } catch (error) {
      return error;
    }
  }

}

import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameSchema } from './schema/game.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Game', schema: GameSchema },
  ])],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}

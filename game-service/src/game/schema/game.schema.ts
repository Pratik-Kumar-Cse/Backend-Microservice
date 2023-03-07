import { Schema } from 'mongoose';
import { Game } from 'src/interface/game.interface';


export const GameSchema = new Schema<Game>(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        price: { type: Number, required: true },

    },
    { timestamps: true }
);


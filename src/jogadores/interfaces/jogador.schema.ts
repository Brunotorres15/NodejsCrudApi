import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema({
    
    nome:  String,
    telefoneCelular: { type: String, unique: true},
    email: { type: String, unique: true},
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String

}, {timestamps: true, collection: 'jogadores'});
// collection é o nome da tabela
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    async criarAtualizarJogador( criaJogadorDto: CriarJogadorDto ): Promise<void>{

        const { email } = criaJogadorDto;


        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado) {
             this.atualizar(criaJogadorDto);
        } else {
             this.criar(criaJogadorDto);
        }

        

    }


    async consultarTodosJogadores(): Promise<Jogador[]>{

        return await this.jogadorModel.find().exec();
    }

    async consultarJogador(email: string): Promise<Jogador> {


        const jogadorEncontrado = this.jogadorModel.findOne({email}).exec();

        if (!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado.`)
        } 

        return jogadorEncontrado;
    }

    async deletarJogador(email: string): Promise<any>{

        return await this.jogadorModel.remove({email}).exec()
    }


    private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {


        const jogadorCriado = new this.jogadorModel(criaJogadorDto);


        return await jogadorCriado.save()




    }


    
    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec()

     
    }




}

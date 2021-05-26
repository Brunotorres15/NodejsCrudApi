import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    async criarAtualizarJogador( criaJogadorDto: CriarJogadorDto ): Promise<void>{

        const { email } = criaJogadorDto;

        // findOne faz a busca no banco de dados criado, é uma funcionalidade do Mongo DB.
        // que pode ser utilizada graças ao extends Document feito na interface. 
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

        // procura o jogador pelo email e retornar o proprio jogador encontrado
        const jogadorEncontrado = this.jogadorModel.findOne({email}).exec();

        if (!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado.`)
        } 

        return jogadorEncontrado;
    }

    async deletarJogador(email: string): Promise<any>{

        return await this.jogadorModel.remove({email}).exec()

        /*
        const jogadorEncontrado =  this.jogadores.find(jogador => jogador.email === email);

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        }
        // faz o filtro para retornar os registros que forem diferentes do email encontrado.
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
        */
    }


    private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {


        const jogadorCriado = new this.jogadorModel(criaJogadorDto);

        // faz a persistência no mongodb
        return await jogadorCriado.save()




    }



        /*
        const { nome, telefoneCelular, email } = criaJogadorDto;

        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'

        };
        // o log serve para já ver as informações do objeto
        // pro exemplo _id: e o valor de id atribuido.
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador);

    }

    */
    
    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

        //findOneAndUpdate, primeiro parâmetro é o campo utilizado para fazer a busca
        // e o segundo é o objeto que ele vai considerar pra fazer a alteração.
        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec()


        /*
        const {nome} = criarJogadorDto;

        jogadorEncontrado.nome = nome;
        */
     
    }




}

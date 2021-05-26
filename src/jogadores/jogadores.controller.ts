import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

// rota que este controller será acessado.
@Controller('api/v1/jogadores')
export class JogadoresController {


    constructor(private readonly jogadoresService: JogadoresService) {}

    // handler a post
    @Post()
    async criarAtualizarJogador(
        // recuperando as informações enviadas no body
        // essas informações terão os atributos do objeto criarJogadorDto
        @Body() criarJogadorDto: CriarJogadorDto) {

        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
            
    }

    @Get()
    async consultarJogadores(
        @Query('email') email: string): Promise<Jogador | Jogador[]>{
            if(email) {
                return await this.jogadoresService.consultarJogador(email);
            } else {
                return await this.jogadoresService.consultarTodosJogadores();
            }
            

    }

    @Delete()
    async deletarJogador( @Query('email') email ): Promise<void> {

        this.jogadoresService.deletarJogador(email);
    }





}

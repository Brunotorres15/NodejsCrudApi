import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
require('dotenv').config()

@Module({

  // mongoose no module principal, com o forRoot da para efetuar a conexão com o mongodb
  // e passar alguns parâmetros do proprio mongoose.
  imports: [
    MongooseModule.forRoot(process.env.DB_ACCESS,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
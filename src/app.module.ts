import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
require('dotenv').config()

@Module({

  imports: [
    MongooseModule.forRoot(process.env.DB_ACCESS,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
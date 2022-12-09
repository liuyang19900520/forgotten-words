import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WordsModule } from "./words/words.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Word } from "./words/word.eneity";
import { WordsController } from "./words/words.controller";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DefaultNamingStrategy } from "typeorm";
import ForgottenWordsNamingStrategy from "./common/ForgottenWordsNamingStrategy";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "172.16.33.33",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "forgotten_words",
    schema:"dev",
    entities: [Word],
    namingStrategy: new ForgottenWordsNamingStrategy(),
  }), TypeOrmModule.forFeature([Word])
  ],
  controllers: [AppController, WordsController],
  providers: [AppService]

})
export class AppModule {
}

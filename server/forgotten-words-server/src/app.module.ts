import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WordsModule } from "./words/words.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "172.16.33.33",
    port: 3306,
    username: "root",
    password: "root",
    database: "forgotten_words"
  })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}

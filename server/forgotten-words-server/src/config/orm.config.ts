import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Event } from "./../events/event.entity";
import { Word } from "../word/entities/word.entity";
import ForgottenWordsNamingStrategy from "../common/ForgottenWordsNamingStrategy";

export default registerAs(
  "orm.config",
  (): TypeOrmModuleOptions => ({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    entities: [Event, Word],
    namingStrategy: new ForgottenWordsNamingStrategy(),
    synchronize: false
  })
);

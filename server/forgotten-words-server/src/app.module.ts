import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfig from "./config/orm.config";
import ormConfigProd from "./config/orm.config.prod";
import { WordModule } from "./word/word.module";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TransformInterceptor } from "./common/interceptor/transform.interceptor";
import { HttpExceptionFilter } from "./common/filter/http-exception.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== "production"
        ? ormConfig : ormConfigProd
    }),
    WordModule
  ],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  }, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }]
})
export class AppModule {
}

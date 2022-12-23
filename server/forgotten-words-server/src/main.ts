import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggingService } from "./common/logging/logging.service";

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: new LoggingService(), // ここに追加
  });
  // Remove line below to enable local ValidationPipe settings
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();

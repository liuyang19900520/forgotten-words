import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';

@Module({
  providers: [],
  controllers: [WordsController],
  exports: [],
})
export class WordsModule {}

import { WordsRepository } from './words.repository';
import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';

@Module({
  providers: [WordsService, WordsRepository],
  controllers: [WordsController],
  exports: [WordsService],
})
export class WordsModule {}

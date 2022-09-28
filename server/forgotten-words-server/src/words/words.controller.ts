import { Controller, Get } from '@nestjs/common';
import { WordModel } from './words.interface';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  public findAll(): Array<WordModel> {
    return this.wordsService.findAll();
  }
}

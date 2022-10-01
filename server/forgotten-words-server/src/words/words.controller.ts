import { Controller, Get, Param, Query } from '@nestjs/common';
import { WordModel } from './words.interface';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  public async findAll(
    @Query('inputWord') inputWord: string,
  ): Promise<WordModel[]> {
    return await this.wordsService.findAll(inputWord);
  }
}

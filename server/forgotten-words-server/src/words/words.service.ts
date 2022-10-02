import { Injectable } from '@nestjs/common';
import { WordModel } from './words.interface';
import { WordsRepository } from './words.repository';

@Injectable()
export class WordsService {
  constructor(private readonly wordsRepository: WordsRepository) {}

  public async findAll(inputWord: string): Promise<WordModel[]> {
    const result = await this.wordsRepository.findAll(inputWord);
    return result;
  }

  public async findItem(id: number): Promise<WordModel> {
    const result = await this.wordsRepository.findItem(id);
    return result;
  }
}

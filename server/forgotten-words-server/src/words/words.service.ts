import { Injectable } from '@nestjs/common';
import { WordModel } from './words.interface';
import { WordsRepository } from './words.repository';

@Injectable()
export class WordsService {
  constructor(private readonly wordsRepository: WordsRepository) {}

  private words: Array<WordModel> = [];

  public findAll(): Array<WordModel> {
    const word1: WordModel = { id: 1, english: 'test' };
    this.words.push(word1);
    this.wordsRepository.getAll();
    return this.words;
  }
}

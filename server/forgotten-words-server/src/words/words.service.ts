import { Injectable } from '@nestjs/common';
import { WordModel } from './words.interface';
import { getAllWords } from '../db/words.model';

@Injectable()
export class WordsService {
  private words: Array<WordModel> = [];

  public findAll(): Array<WordModel> {
    const word1: WordModel = { id: 1, english: 'test' };
    this.words.push(word1);
    getAllWords('abc');
    return this.words;
  }
}

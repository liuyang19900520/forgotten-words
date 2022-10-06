import { Controller, Get, Param, Query } from "@nestjs/common";
import { WordModel } from "./words.interface";
import { WordsService } from "./words.service";

@Controller("words")
export class WordsController {
  constructor(private readonly wordsService: WordsService) {
  }

  @Get()
  public async findAll(
    @Query("inputWord") inputWord: string
  ): Promise<WordModel[]> {
    console.log(("test parma"), inputWord);
    return await this.wordsService.findAll(inputWord);
  }

  @Get("/:id")
  public async findItem(
    @Param("id") id: number
  ): Promise<WordModel> {
    return await this.wordsService.findItem(id);
  }
}

import { Controller, Delete, Get, Param, Query } from "@nestjs/common";
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
    return await this.wordsService.findAll(inputWord);
  }

  @Get("/:id")
  public async findItem(
    @Param("id") id: string
  ): Promise<WordModel> {
    return await this.wordsService.findItem(id.trim());
  }

  @Delete(":id")
  public async deleteItem(
    @Param("id") id: string
  ): Promise<void> {
    console.log("@@@@@@@@@", id);
    await this.wordsService.deleteItem(id.trim());
  }
}

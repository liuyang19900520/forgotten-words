import {Body, Controller, Delete, Get, Logger, Param, Post, Put, Query} from "@nestjs/common";
import {WordService} from "./word.service";
import {CreateWordDto} from "./dto/create-word.dto";
import {UpdateWordDto} from "./dto/update-word.dto";
import {SystemException} from "../common/exception/system.exception";

@Controller("words")
export class WordController {
  constructor(private readonly wordService: WordService) {
  }

  private readonly logger = new Logger(WordController.name);


  @Post()
  async create(@Body() createWordDto: CreateWordDto) {
    let result = await this.wordService.create(createWordDto);
    return result;
  }

  @Get()
  async findAll(@Query("pageNo") pageNo, @Query("pageSize") pageSize, @Query("keyword") keyword) {
    let promise = await this.wordService.findAll(pageNo, pageSize, keyword);
    return promise;
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    let word = await this.wordService.findOne(+id);
    console.log(word);
    if (!word) {
      throw new SystemException("000", "test error");
    }
    return word;
  }

  @Put()
  update(@Body() updateWordDto: UpdateWordDto) {
    return this.wordService.update(updateWordDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.wordService.remove(+id);
  }
}

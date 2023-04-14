import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { WordService } from "./word.service";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";
import e from "express";
import { log } from "winston";
import { SystemException } from "../common/exception/system.exception";

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
    console.log(pageNo, pageSize, keyword);
    let promise = await this.wordService.findAll(pageNo, pageSize, keyword);
    return promise;
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    let word = await this.wordService.findOne(+id);
    if (!word) {
      throw new SystemException("000", "test error");
    }
    return word;
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateWordDto: UpdateWordDto) {
    this.logger.error(updateWordDto);
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.wordService.remove(+id);
  }
}

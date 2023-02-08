import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from "@nestjs/common";
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
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }

  @Get()
  async findAll() {
    let promise = await this.wordService.findAll();
    return promise;
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    let wordPromise = await this.wordService.findOne(+id);
    if(wordPromise){
      throw new SystemException("000","test error");
    }
    return this.wordService.findOne(+id);
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

import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { WordService } from "./word.service";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";
import e from "express";

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
    this.logger.log(promise);
    return promise;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.wordService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.wordService.remove(+id);
  }
}

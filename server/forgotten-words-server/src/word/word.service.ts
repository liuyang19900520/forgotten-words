import { Injectable } from "@nestjs/common";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Word } from "./entities/word.entity";
import { Repository } from "typeorm";

@Injectable()
export class WordService {

  constructor(
    @InjectRepository(Word)
    private readonly repository: Repository<Word>
  ) {
  }

  async create(createWordDto: CreateWordDto) {
    return await this.repository.save({
      ...createWordDto,
      favoriteStar: 0,
      createTime: new Date(),
      createUser: createWordDto.user,
      updateTime: new Date(),
      updateUser: createWordDto.user
    });
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async update(id: number, updateWordDto: UpdateWordDto) {
    const word = await this.repository.findOne(id);

    return await this.repository.save({
      ...word,
      ...updateWordDto,
      updateTime: new Date(),
      updateUser: updateWordDto.user
    });
  }

  async remove(id: number) {
    const word = await this.repository.findOne(id);
    await this.repository.remove(word);
  }
}

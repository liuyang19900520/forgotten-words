import { Injectable } from "@nestjs/common";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Word } from "./entities/word.entity";
import { Like, Repository } from "typeorm";

@Injectable()
export class WordService {

  constructor(
    @InjectRepository(Word)
    private readonly repository: Repository<Word>
  ) {
  }

  async create(createWordDto: CreateWordDto) {
    let result = await this.repository.save({
      ...createWordDto,
      favoriteStar: 0,
      createTime: new Date(),
      createUser: createWordDto.user,
      updateTime: new Date(),
      updateUser: createWordDto.user
    });
    console.log("liuyang", result);
    return result;
  }

  async findAll(pageNo: number, pageSize: number, keyword: string) {
    const [result, total] = await this.repository.findAndCount(
      {
        where: {
          english: Like(keyword + "%")
        },
        take: pageSize,
        skip: (pageNo - 1) * pageSize
      }
    );

    console.log(result);
    return {
      items: result,
      total: total
    };
  }

  async findOne(id: number) {
    let word = await this.repository.findOne(id);
    return word;
  }

  async update(updateWordDto: UpdateWordDto) {
    const word = await this.repository.findOne(updateWordDto.id);

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

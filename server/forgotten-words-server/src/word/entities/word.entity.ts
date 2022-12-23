import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  english?: string;
  @Column()
  japanese?: string;
  @Column()
  chinese?: string;
  @Column()
  type?: string;
  @Column()
  series?: string;
  @Column()
  episode?: string;
  @Column()
  favoriteStar?: number;
  @Column()
  deleteFlg?: string;
  @Column()
  createUser?: string;
  @Column()
  createTime?: Date;
  @Column()
  updateUser?: string;
  @Column()
  updateTime?: Date;
}

import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('word',{name:'words'})
export class Word{
  @PrimaryGeneratedColumn()
  id: number;
  english?: string;
  japanese?: string;
  chinese?: string;
  inputType?: string;
  series?: string;
  episode?: string;
  isFavorite?: boolean;
}

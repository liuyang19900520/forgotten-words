
export class CreateWordDto {
  id: number;
  english?: string;
  japanese?: string;
  chinese?: string;
  inputType?: string;
  series?: string;
  episode?: string;
  favoriteStar?: number;
  user?:string;
}

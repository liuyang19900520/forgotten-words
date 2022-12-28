import http, { Res } from "./http-common";

export interface Word {
  id: number;
  japanese: string;
  english: string;
  chinese: string;
}

export const findAll = (): Promise<Res<Word>> => http.get("/words");

export const findWord = (id: string | string[]): Promise<Res<Word>> =>
  http.get("/words/" + id);

export const saveWord = (
  id: string | string[],
  input: Word
): Promise<Res<Word>> => {
  if (id) {
    return http.put("/words/" + id, input);
  } else {
    return http.post("/words", input);
  }
};

export const searchWord = (data: string): Promise<Res<Word>> =>
  http.get("/words?inputWord=" + data);

export const deleteWord = (id: string | string[]): Promise<void> =>
  http.delete("/words/" + id);

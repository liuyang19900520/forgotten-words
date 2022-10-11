import http from "./http-common";

interface Word {
  id: string;
  english: string;
  chinese: string;
  japanese: string;
}

export const findAll = (): Promise<Word> => http.get("/words");

export const searchWord = (data: string): Promise<Word> =>
  http.get("/words?inputWord=" + data);

export const findWord = (id: string): Promise<Word> =>
  http.get("/words/ " + id);
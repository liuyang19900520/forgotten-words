import http from "./http-common";

export interface Res {
  code: string;
  message: string;
  data: any;
}

export const findAll = (): Promise<Res> => http.get("/words");

export const searchWord = (data: string): Promise<Res> =>
  http.get("/words?inputWord=" + data);

export const findWord = (id: string): Promise<Res> => http.get("/words/" + id);

export const deleteWord = (id: string): Promise<void> =>
  http.delete("/words/" + id);

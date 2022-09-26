import http from "./http-common";

interface TestData {
  type: string;
  query: any;
  features: any;
  attribution: string;
}
export const testApi1 = (data: string): Promise<TestData> =>
  http.get(
    "/mapbox.places/" +
      data +
      ".json?access_token=pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q&types=place"
  );
export const testApi = (data: string): Promise<TestData> => http.get("/words");

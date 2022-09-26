import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: "http://localhost:3000",
  //baseURL: "https://90wyj1w04m.execute-api.ap-northeast-1.amazonaws.com/prod",
  //baseURL: "https://api.mapbox.com/geocoding/v5/",
  // リクエストヘッダ
  //   headers: {
  //     "Content-type": "application/json",
  //   },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

apiClient.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default apiClient;

import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: "https://api.mapbox.com/geocoding/v5/",
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

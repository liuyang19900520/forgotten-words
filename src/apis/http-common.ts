import axios, { AxiosInstance } from "axios";
import storage from "../stores/storage";

export interface Res<T> {
  code: string;
  message: string;
  data: T;
}

const instance: AxiosInstance = axios.create({
  // API
  baseURL: "http://localhost:3000",
  timeout: 30000,
  headers: {
    "Content-type": "application/json;charset=utf-8",
  },
});

const errorHandle = (status: number, other: any) => {
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      storage.remove("accessToken");
      storage.remove("username");
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      console.error("登录过期，请重新登录");
      storage.remove("accessToken");
      storage.remove("username");
      break;
    // 404请求不存在
    case 404:
      console.error("请求的资源不存在");
      break;
    default:
      console.error(other);
  }
};

//请求拦截器
instance.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    let token = storage.get("accessToken");
    if (token != null) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) => {
    if (res.status === 200 || res.status === 201) {
      console.log("res===", res);
      return res.data;
    }
  },
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
    }
  }
);

export default instance;

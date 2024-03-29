export interface ISysCfgBModItem {
  name: string; // 模块名称
  enable: boolean; // 是否启用
}

export interface ISysCfg {
  baseUrl: string; // 主机地址 和 监听端口
  bmodNames: ISysCfgBModItem[]; // 业务模块列表
}

const iSysCfg: ISysCfg = {
  baseUrl: "http://127.0.0.1:3000", // 'http://192.168.0.102:8080',
  bmodNames: [
    {
      name: "translator",
      enable: true,
    },
  ],
};

export default iSysCfg;
